import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import GitHubStrategy from "passport-github2";
import { Octokit } from "octokit";
import cookieSession from "cookie-session";

dotenv.config();

const port = process.env.PORT || 4000;

const FRONTEND_URL = process.env.NODE_ENV == "production"? process.env.FRONTEND_URL : "http://localhost:3000";
const BACKEND_URL = process.env.NODE_ENV == "production"? process.env.BACKEND_URL : `http://localhost:${port}` 

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
  cookieOptions =  {
    secure: true,
    domain: ".up.railway.app"
  }

  sessionCookieOptions = {
    httpOnly: true,
    sameSite: "lax",
    ...cookieOptions
  };

} else {
  cookieOptions = {}

  sessionCookieOptions = {
    sameSite: "lax",
  };
}

app.use(
  cookieSession({
    name: 'session',
    secret: process.env.SESSION_SECRET,
    signed: true,
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    ...sessionCookieOptions
  })
)

// https://github.com/jaredhanson/passport/issues/904
app.use(function(request, response, next) {
  if (request.session && !request.session.regenerate) {
      request.session.regenerate = (cb) => {
          cb()
      }
  }
  if (request.session && !request.session.save) {
      request.session.save = (cb) => {
          cb()
      }
  }
  next()
})

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
        return done(null, {id: profile.id, username: profile.username, token: accessToken});
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
    req.session = null
    if (err) {
      return next(err);
    }
    res.redirect(FRONTEND_URL);
  });
});

app.get("/repos", async function (req, res) {
  const octokit = getOctokit(req);

  let repos;
  if (req.isAuthenticated() && req.user.username == req.query.user) {
    // endpoint returns private repos as well if the Github App is authorized AND installed
    // see https://docs.github.com/en/apps/using-github-apps/authorizing-github-apps#difference-between-authorization-and-installation
    repos = await octokit.request(`GET /user/repos`);
  } else {
    repos = await octokit.request(`GET /users/${req.query.user}/repos`);
  }
  return res.json(repos.data);
});

app.get("/profile-stats", async function (req, res) {
  const octokit = getOctokit(req);

  const profileStats = await octokit.request(`GET /users/${req.query.user}`);
  return res.json(profileStats.data);
});

app.get("/events", async function (req, res) {
  const octokit = getOctokit(req);

  const events = await octokit.request(`GET /users/${req.query.user}/events`);
  return res.json(events.data);
});

app.get("/repo-stats", async function (req, res) {
  const octokit = getOctokit(req);

  const repoStats = await octokit.request(
    `GET /repos/${req.query.user}/${req.query.repo}`
  );

  const languages = await octokit.request(
    `GET /repos/${req.query.user}/${req.query.repo}/languages`
  );

  return res.json({ ...repoStats.data, languages: languages.data });
});

app.get("/repos", async function (req, res) {
  const octokit = getOctokit(req);

  const repos = await octokit.request(`GET /users/${req.query.user}/repos`);
  return res.json(repos.data);
});

app.get("/commits", async function (req, res) {
  let octokit;

  const commits = await octokit.request(
    `GET /repos/${req.query.user}/${req.query.repo}/commits`
  );

  return res.json(commits.data);
});

app.get("/rate_limit", async function (req, res) {
  let octokit;

  const rateLimit = await octokit.request("GET /rate_limit");

  return res.json(rateLimit.data);
});

app.listen(port, function () {
  console.log(`CORS is running on port ${port}`);
});
