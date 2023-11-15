import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import GitHubStrategy from "passport-github2";
import cookieSession from "cookie-session";
import methodOverride from "method-override";

import { logout, onLogin } from "./api/auth.js";
import {
  getCodeFrequency,
  getCommitActivity,
  getCommits,
  getContributors,
  getEvents,
  getParticipation,
  getRepo,
  getRepoIssues,
  getRepoLanguages,
} from "./api/repo.js";
import { getRateLimit, getRepos, getUser, getUserEvents } from "./api/user.js";
import { errorHandler } from "./api/error.js";
import { port, CLIENT_URL, SERVER_URL } from "./api/utils.js";
import { searchCommits, searchRepos, searchUsers } from "./api/search.js";

dotenv.config();

const app = express();
app.use(cors({ credentials: true }));
app.use(
  cors({
    origin: CLIENT_URL,
  })
);

// https://www.npmjs.com/package/express-session#cookiesecure
app.set("trust proxy", 1);

let sessionCookieOptions = { sameSite: "lax" };
if (process.env.NODE_ENV == "production") {
  sessionCookieOptions = {
    httpOnly: true,
    secure: true,
    domain: process.env.DOMAIN,
    ...sessionCookieOptions,
  };
}

app.use(
  cookieSession({
    name: "ghStatsSession",
    secret: process.env.SESSION_SECRET,
    signed: true,
    // Cookie Options
    maxAge: 8 * 60 * 60 * 1000, // 8 hours
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
      callbackURL: `${SERVER_URL}/auth/github/callback`,
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

app.use(methodOverride());

app.get("/auth/github", passport.authenticate("github"));

app.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: `${CLIENT_URL}/login`,
  }),
  onLogin
);

app.get("/logout", logout);
app.get("/rate-limit", getRateLimit)

app.get("/search/users", searchUsers)
app.get("/search/repos", searchRepos)
app.get("/search/commits", searchCommits)

app.get("/user-details", getUser);
app.get("/user-events", getUserEvents);

app.get("/repos", getRepos);

app.get("/repo-details", getRepo);
app.get("/repo-events", getEvents);
app.get("/repo-issues", getRepoIssues);
app.get("/repo-details", getRepo);
app.get("/repo-languages", getRepoLanguages);

app.get("/commits", getCommits);
app.get("/contributors", getContributors);
app.get("/code-frequency", getCodeFrequency);
app.get("/commit-activity", getCommitActivity);
app.get("/participation", getParticipation);

// Note: this HAS to come after the routes or it won't work, see: https://stackoverflow.com/questions/29700005/express-4-middleware-error-handler-not-being-called
app.use(errorHandler);

app.listen(port, function () {
  console.log(`CORS is running on port ${port}`);
});
