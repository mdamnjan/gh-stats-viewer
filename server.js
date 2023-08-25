import express from "express";
import axios from "axios";
import * as dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import GitHubStrategy from "passport-github2";
import session from "express-session";
import { Octokit } from "octokit";

dotenv.config();

const app = express();
app.use(cors({ credentials: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
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
      callbackURL: `http://localhost:${port}/auth/github/callback`,
    },
    function (accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
        profile.accessToken = accessToken;
        return done(null, profile);
      });
    }
  )
);

function getOctokit() {
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
    failureRedirect: "http://localhost:3000/login",
  }),
  function (req, res) {
    // additional non-httpOnly cookie that can be read client-side
    // purely for nicer UX e.g. show "Log Out" button when user is already logged in
    res.cookie("isGithubAuthenticated", true);
    // Successful authentication, redirect home.
    res.redirect("http://localhost:3000/");
  }
);

app.get("/logout", function (req, res, next) {
  res.clearCookie("connect.sid");
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
    res.redirect("http://localhost:3000/");
  });
});

app.get("/repos", async function (req, res) {
  const octokit = getOctokit();

  let repos;
  if (req.isAuthenticated()) {
    // endpoint returns private repos as well if the Github App is authorized AND installed
    // see https://docs.github.com/en/apps/using-github-apps/authorizing-github-apps#difference-between-authorization-and-installation
    repos = await octokit.request(`GET /user/repos`);
  } else {
    repos = await octokit.request(`GET /users/${req.query.user}/repos`);
  }
  return res.json(repos.data);
});

app.get("/profile-stats", async function (req, res) {
  const octokit = getOctokit();

  const profileStats = await octokit.request(`GET /users/${req.query.user}`);
  return res.json(profileStats.data);
});

app.get("/events", async function (req, res) {
  const octokit = getOctokit();

  const events = await octokit.request(`GET /users/${req.query.user}/events`);
  return res.json(events.data);
});

app.get("/repo-stats", async function (req, res) {
  const octokit = getOctokit();

  const repoStats = await octokit.request(
    `GET /repos/${req.query.user}/${req.query.repo}`
  );

  const languages = await octokit.request(
    `GET /repos/${req.query.user}/${req.query.repo}/languages`
  );

  return res.json({ ...repoStats.data, languages: languages.data });
});

app.get("/repos", async function (req, res) {
  const octokit = getOctokit();

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
