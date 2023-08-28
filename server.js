import express from "express";
import axios from "axios";
import * as dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import GitHubStrategy from "passport-github2";
import session from "express-session";
import { Octokit } from "octokit";
import RedisStore from "connect-redis"
import {createClient} from "redis"

dotenv.config();

const FRONTEND_URL = process.env.FRONTEND_URL;

const app = express();
app.use(cors({ credentials: true }));
app.use(
  cors({
    origin: FRONTEND_URL,
  })
);

// Initialize client.
let redisClient = createClient({ url: process.env.REDIS_URL})
redisClient.connect().catch(console.error)

// Initialize store.
let redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
})

app.use(
  session({
    name: "ghStatsSession",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    // store: redisStore,
    proxy: true,
    cookie: {
      secure: true,
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT || 4000;

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
      callbackURL: `https://gh-stats-viewer-api.up.railway.app/auth/github/callback`,
    },
    function (accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
        profile.accessToken = accessToken;
        return done(null, profile);
      });
    }
  )
);

function getOctokit(req) {
  let octokit;
  if (req.isAuthenticated()) {
    octokit = new Octokit({ auth: req.user.accessToken });
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
    res.cookie("isGithubAuthenticated", true, { secure: true });
    // Successful authentication, redirect home.
    res.redirect(FRONTEND_URL);
  }
);

app.get("/logout", function (req, res, next) {
  res.clearCookie("ghStatsSession");
  res.clearCookie("isGithubAuthenticated");
  req.logout(function (err) {
    // req.logout alone will not get rid of the session/cookie, see
    // https://www.initialapps.com/properly-logout-passportjs-express-session-for-single-page-app/#:~:text=Using%20req.,pesky%20cookie%20on%20the%20client.
    req.session.destroy(function (err) {
      res.send();
    });
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
