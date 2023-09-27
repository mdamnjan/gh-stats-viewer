import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import GitHubStrategy from "passport-github2";
// import { Octokit } from "octokit";
import cookieSession from "cookie-session";
import { RequestError } from "@octokit/request-error";
import { Octokit } from "@octokit/rest";

dotenv.config();

const port = process.env.PORT || 4000;

const FRONTEND_URL =
  process.env.NODE_ENV == "production"
    ? process.env.FRONTEND_URL
    : "http://localhost:3000";
const BACKEND_URL =
  process.env.NODE_ENV == "production"
    ? process.env.BACKEND_URL
    : `http://localhost:${port}`;

const app = express();
app.use(cors({ credentials: true }));
app.use(
  cors({
    origin: FRONTEND_URL,
  })
);

// https://www.npmjs.com/package/express-session#cookiesecure
app.set("trust proxy", 1);

let sessionCookieOptions, cookieOptions;
if (process.env.NODE_ENV == "production") {
  cookieOptions = {
    secure: true,
    domain: ".up.railway.app",
  };

  sessionCookieOptions = {
    httpOnly: true,
    sameSite: "lax",
    ...cookieOptions,
  };
} else {
  cookieOptions = {};

  sessionCookieOptions = {
    sameSite: "lax",
  };
}

app.use(
  cookieSession({
    name: "ghStatsSession",
    secret: process.env.SESSION_SECRET,
    signed: true,
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    ...sessionCookieOptions,
  })
);

// https://github.com/jaredhanson/passport/issues/904
app.use(function (request, response, next) {
  if (request.session && !request.session.regenerate) {
    request.session.regenerate = (cb) => {
      cb();
    };
  }
  if (request.session && !request.session.save) {
    request.session.save = (cb) => {
      cb();
    };
  }
  next();
});

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: `${BACKEND_URL}/auth/github/callback`,
    },
    function (accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
        return done(null, {
          id: profile.id,
          username: profile.username,
          token: accessToken,
        });
      });
    }
  )
);

function getOctokit(req) {
  let octokit;
  if (req.isAuthenticated()) {
    octokit = new Octokit({ auth: req.user.token });
  } else {
    octokit = new Octokit({});
  }
  return octokit;
}

async function getResource(req, res, url, next) {
  let octokit = getOctokit(req);
  let results;
  try {
    results = await octokit.request(url);
  } catch (error) {
    throw error;
  }
  if (results) {
    return results.data;
  }
}

app.get("/auth/github", passport.authenticate("github"));

app.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: `${FRONTEND_URL}/login`,
  }),
  function (req, res) {
    // additional non-httpOnly cookie that can be read client-side
    // purely for nicer UX e.g. show "Log Out" button when user is already logged in
    res.cookie("isGithubAuthenticated", true, cookieOptions);
    // Successful authentication, redirect home.
    res.redirect(FRONTEND_URL);
  }
);

app.get("/logout", function (req, res, next) {
  res.clearCookie("ghStatsSession", cookieOptions);
  res.clearCookie("isGithubAuthenticated", cookieOptions);
  req.logout(function (err) {
    req.session = null;
    if (err) {
      return next(err);
    }
    res.redirect(FRONTEND_URL);
  });
});

app.get("/repos", async function (req, res, next) {
  let repos;
  let octokit = getOctokit(req);

  if (req.isAuthenticated() && req.user.username == req.query.user) {
    // endpoint returns private repos as well if the Github App is authorized AND installed
    // see https://docs.github.com/en/apps/using-github-apps/authorizing-github-apps#difference-between-authorization-and-installation
    try {
      repos = await octokit.rest.repos.listForAuthenticatedUser({
        sort: "updated",
      });
    } catch (error) {
      res.status(error.status).send(error.message);
      return;
    }
  } else {
    try {
      repos = await octokit.rest.repos.listForUser({
        username: req.query.user,
        sort: "updated",
      });
    } catch (error) {
      res.status(error.status).send(error.message);
      return;
    }
  }
  return res.json(repos.data);
});

app.get("/profile-stats", async function (req, res, next) {
  let octokit = getOctokit(req);
  let profileStats;
  try {
    profileStats = await octokit.rest.users.getByUsername({
      username: req.query.user,
    });
  } catch (error) {
    res.status(error.status).send(error.message);
    return;
  }
  return res.json(profileStats.data);
});

app.get("/events", async function (req, res, next) {
  let octokit = getOctokit(req);
  let events;
  try {
    events = await octokit.rest.activity.listRepoEvents({
      owner: req.query.user,
      repo: req.query.repo,
      per_page: req.query.num_events,
    });
  } catch (error) {
    res.status(error.status).send(error.message);
    return;
  }
  return res.json(events.data);
});

app.get("/repo-issues", async function (req, res, next) {
  let octokit = getOctokit(req);
  let issues;
  try {
    issues = await octokit.rest.issues.listForRepo({
      owner: req.query.user,
      repo: req.query.repo
    });
  } catch (error) {
    res.status(error.status).send(error.message);
    return;
  }

  console.log("issues", issues)
  return res.json(issues.data);
});

app.get("/repo-stats", async function (req, res, next) {
  let octokit = getOctokit(req)
  let repoStats;
  try {
    repoStats = await octokit.request(`GET /repos/${req.query.user}/${req.query.repo}`)
  } catch(error) {
    console.log(error)
    res.status(error.status).send(error.message);
    return;
  }

  let languages;
  try {
    languages = await octokit.request(`GET /repos/${req.query.user}/${req.query.repo}/languages`)
  } catch(error) {
    res.status(error.status).send(error.message);
    return;
  }

  return res.json({ ...repoStats.data, languages: languages.data });
});

app.get("/commits", async function (req, res, next) {
  let octokit = getOctokit(req);

  let commits;
  try {
  commits = await octokit.request("GET /repos/{owner}/{repo}/commits", {owner: req.query.user, repo: req.query.repo, per_page: req.query.num_commits})
  } catch (error) {
    res.status(error.status).send(error.message);
    return;
  }
  
  // console.log(commits.headers['link'])

  let commitCount = 0

  
  // await octokit
  // .request("GET /repos/{owner}/{repo}/commits", {owner: req.query.user, repo: req.query.repo})
  // .then((commits) => {
  //   // issues is an array of all issue objects. It is not wrapped in a { data, headers, status, url } object
  //   // like results from `octokit.request()` or any of the endpoint methods such as `octokit.rest.issues.listForRepo()`
  //   commitCount = commits.length
  // });

  return res.json({ commits: commits.data, commitCount: commitCount });
});

app.get("/contributors", async function (req, res, next) {
  const contributors = await getResource(
    req,
    res,
    `GET /repos/${req.query.user}/${req.query.repo}/stats/contributors`,
    next
  );
  return res.json(contributors);
});

app.get("/metrics", async function (req, res, next) {
  const contributors = await getResource(
    req,
    res,
    `GET /repos/${req.query.user}/${req.query.repo}/stats/contributors`,
    next
  );

  const weeklyCommits = await getResource(
    req,
    res,
    `GET /repos/${req.query.user}/${req.query.repo}/stats/code_frequency`,
    next
  );

  const weeklyCommitCount = await getResource(
    req,
    res,
    `GET /repos/${req.query.user}/${req.query.repo}/stats/participation`,
    next
  );

  const userEvents = await getResource(
    req,
    res,
    `GET /users/${req.query.user}/events`,
    next
  );

  const lastYearOfCommits = await getResource(
    req,
    res,
    `GET /repos/${req.query.user}/${req.query.repo}/stats/commit_activity`,
    next
  );
  return res.json({
    contributors: contributors,
    weeklyCommits: weeklyCommits,
    weeklyCommitCount: weeklyCommitCount,
    userEvents: userEvents,
    lastYearOfCommits: lastYearOfCommits
  });
});

app.get("/rate_limit", async function (req, res, next) {
  let octokit = getOctokit(req);
  let rateLimit;
  try {
    rateLimit = await octokit.request("GET /rate_limit");
  } catch (error) {
    res.status(error.status).send(error.message);
    return;
  }

  return res.json(rateLimit.data);
});

app.listen(port, function () {
  console.log(`CORS is running on port ${port}`);
});
