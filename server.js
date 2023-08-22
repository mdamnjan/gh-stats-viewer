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
app.use(cors({ credentials: true }))
app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(
  session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false })
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
      })
    }
  )
);

app.get("/auth/github", passport.authenticate("github"));

app.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "http://localhost:3000/login",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("http://localhost:3000/");
  }
);

app.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.get(
  "/repos",
  async function (req, res) {
    let octokit;
    if (req.isAuthenticated()) {
      octokit = new Octokit({auth: req.user.accessToken});
        }
    else {
      octokit = new Octokit({})
    }
    const repos = await octokit.request(`GET /users/${req.query.user}/repos`);
    return res.json(repos.data);
  }
);


app.get("/profile-stats", async function (req, res) {
  try {
    let octokit;
    console.log("IS AUTHENTICATED", req.isAuthenticated(), req.user)
    if (req.isAuthenticated()) {
      octokit = new Octokit({auth: req.user.accessToken});
        }
    else {
      octokit = new Octokit({})
    }
    const profileStats = await octokit.request(`GET /users/${req.query.user}`);
    console.log(profileStats)
    return res.json(profileStats.data);
  } catch (error) {
    console.log(error);
  }
});

app.get("/events", async function (req, res) {
  try {
    let octokit;
    if (req.isAuthenticated()) {
      octokit = new Octokit({auth: req.user.accessToken});
        }
    else {
      octokit = new Octokit({})
    }
    const events = await octokit.request(`GET /users/${req.query.user}/events`);
    return res.json(events.data);
  } catch (error) {
    console.log(error);
  }
});

app.get("/repo-stats", async function (req, res) {
  let octokit;
  if (req.isAuthenticated()) {
    octokit = new Octokit({auth: req.user.accessToken});
      }
  else {
    octokit = new Octokit({})
  }
  const repoStats = await octokit.request(
    `GET /repos/${req.query.user}/${req.query.repo}`
  );

  const languages = await octokit.request(
    
    `GET /repos/${req.query.user}/${req.query.repo}/languages`
  );

  return res.json({ ...repoStats.data, languages: languages.data });
});

app.get("/repos", async function (req, res) {
  let octokit;
  if (req.isAuthenticated()) {
    octokit = new Octokit({auth: req.user.accessToken});
      }
  else {
    octokit = new Octokit({})
  }
  const repos = await octokit.request(`GET /users/${req.query.user}/repos`);
  return res.json(repos.data);
});

app.get("/commits", async function (req, res) {
  let octokit;
  if (req.isAuthenticated()) {
    octokit = new Octokit({auth: req.user.accessToken});
      }
  else {
    octokit = new Octokit({})
  }
  const commits = await octokit.request(
    `GET /repos/${req.query.user}/${req.query.repo}/commits`
  );

  return res.json(commits.data);
});

app.listen(port, function () {
  console.log(`CORS is running on port ${port}`);
});
