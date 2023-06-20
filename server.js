import dotenv from "dotenv";
import fs from "fs";
import { App as OctokitApp } from "octokit";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser());

// Load environment variables from .env file
dotenv.config();

// Set configured values
const appId = process.env.APP_ID;
const privateKeyPath = process.env.PRIVATE_KEY_PATH;
const privateKey = fs.readFileSync(privateKeyPath, "utf8");
// Create an authenticated Octokit client authenticated as a GitHub App
const octokitApp = new OctokitApp({
  appId,
  privateKey,
});

// Optional: Get & log the authenticated app's name
const { data } = await octokitApp.octokit.request("GET /app");

// Read more about custom logging: https://github.com/octokit/core.js#logging
octokitApp.octokit.log.debug(`Authenticated as '${data.name}'`);

// authenticate as an app installation
const octokit = await octokitApp.getInstallationOctokit(
  process.env.INSTALLATION_ID
);

app.get("/profile-stats", async function (req, res) {
  try {
    const profileStats = await octokit.request(`GET /users/${req.query.user}`);
    return res.json(profileStats.data);
  } catch (error) {
    console.log(error)
  }

});

app.get("/events", async function (req, res) {
  try {
    const events = await octokit.request(`GET /users/${req.query.user}/events`);
    return res.json(events.data);
  } catch (error) {
    console.log(error)
  }
});

app.get("/repo-stats", async function (req, res) {
  const repoStats = await octokit.request(
    `GET /repos/${req.query.user}/${req.query.repo}`
  );

  const languages = await octokit.request(
    `GET /repos/${req.query.user}/${req.query.repo}/languages`
  );

  return res.json({...repoStats.data, "languages": languages.data});
});

app.get("/repos", async function (req, res) {
  const repos = await octokit.request(`GET /users/${req.query.user}/repos`);
  return res.json(repos.data);
});

app.get("/commits", async function (req, res) {
  const commits = await octokit.request(
    `GET /repos/${req.query.user}/${req.query.repo}/commits`
  );

  return res.json(commits.data);
});

app.listen(4000, function () {
  console.log("CORS is running on port 4000");
});
