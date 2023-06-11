import dotenv from "dotenv";
import fs from "fs";
import { App as OctokitApp } from "octokit";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

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

// test to see if the authentication worked
// const repos = await octokit.request(
//   `GET /users/${process.env.REACT_APP_GH_USER}/repos`
// );

// console.log(repos.data);
  

app.listen(4000, function () {
  console.log("CORS is running on port 4000");
});

