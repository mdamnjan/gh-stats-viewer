import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import GitHubStrategy from "passport-github2";
import { Octokit } from "octokit";
import cookieSession from "cookie-session";

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

  try {
    const result = await octokit.request(url);
    return result.data;
  } catch (error) {
    res.status(error.status);
    console.log("error", error);
    return error;
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
  let url;
  if (req.isAuthenticated() && req.user.username == req.query.user) {
    // endpoint returns private repos as well if the Github App is authorized AND installed
    // see https://docs.github.com/en/apps/using-github-apps/authorizing-github-apps#difference-between-authorization-and-installation
    url = `GET /user/repos?sort=updated`;
  } else {
    url = `GET /users/${req.query.user}/repos?sort=updated`;
  }
  const repos = await getResource(req, res, url, next);

  return res.json(repos);
});

app.get("/profile-stats", async function (req, res, next) {
  const profileStats = await getResource(
    req,
    res,
    `GET /users/${req.query.user}`,
    next
  );

  return res.json(profileStats);
});

app.get("/events", async function (req, res, next) {
  const events = await getResource(
    req,
    res,
    `GET /users/${req.query.user}/events?per_page=${req.query.num_events}`,
    next
  );

  console.log(req, res)

  return res.json(events);
});

app.get("/repo-stats", async function (req, res, next) {
  const repoStats = await getResource(
    req,
    res,
    `GET /repos/${req.query.user}/${req.query.repo}`,
    next
  );

  const languages = await getResource(
    req,
    res,
    `GET /repos/${req.query.user}/${req.query.repo}/languages`,
    next
  );

  return res.json({ ...repoStats, languages: languages });
});

app.get("/commits", async function (req, res, next) {
  const commits = await getResource(
    req,
    res,
    `GET /repos/${req.query.user}/${req.query.repo}/commits?per_page=${req.query.num_commits}`,
    next
  );

  return res.json(commits);
});

app.get("/contributors", async function (req, res, next) {
  const contributors = await getResource(
    req,
    res,
    `GET /repos/${req.query.user}/${req.query.repo}/contributors`,
    next
  );

  return res.json(contributors);
});

app.get("/rate_limit", async function (req, res, next) {
  const rateLimit = await getResource(req, res, "GET /rate_limit", next);

  return res.json(rateLimit);
});

app.listen(port, function () {
  console.log(`CORS is running on port ${port}`);
});
