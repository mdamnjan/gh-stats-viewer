# Gh Stats Viewer

 Check out cool metrics for any GitHub user, org or repository 📊

 ## How to use it

### Using the deployed instance 
The easiest way to use `Gh Stats Viewer` is to use the deployed `Railway` instance that is linked in this GitHub repo.

You can start `Gh Stats Viewer` immediately without signing in with GitHub, but you may want to sign in if:
- You would like to see metrics for your private repositories
- You hit a [rate limit](https://github.com/mdamnjan/gh-stats-viewer/edit/main/README.md#rate-limits).

#### Accessing private repositories
Signing in with GitHub will authorize the Gh Stats Viewer [GitHub App](https://github.com/apps/gh-profile-stats), however, it will not automatically grant access to your private repositories.

To allow access to private repositories, you will also need to install the GitHub App here: https://github.com/apps/gh-profile-stats to your account. On installation, you can choose which repositories you wish to grant the app access to. You can always revoke access or uninstall the app through `Settings` > `Integrations` > `Applications` on your GitHub account.

### Running it locally
1. Generate a personal access token for your GitHub account. Follow this guide: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token
2. Clone this repository 
3. Create a `.env` file in the root folder of the cloned repository, and copy the contents of the `.env.sample` file.
4. Paste your personal access token into the `GH_TOKEN` variable in your `.env`

 #### With docker
 5. Run `docker-compose build` in your root folder
 6. Run `docker-compose up`

#### With npm
 5. Run `npm install` in the root folder
 6. Run `npm run dev`
 7. In another terminal/tab, `cd client && npm install`
 8. Run `npm run dev`

Navigate to `http://localhost:3000` and start searching!
 
 ## Rate Limits

 Because `Gh Stats Viewer` is powered by GitHub's APIs, it is also limited by the rate limits set by GitHub.
 
 At the moment, the rate limits are as follows:

 - 5000 `REST` calls per hour
 - 5000 `GraphQL` calls per hour
 - 30 search (user or repo) calls per minute

 This rate limit is shared for all unauthenticated users in the deployed instance, e.g.: 
  - _Bob and Alice are both accessing `Gh Stats Viewer` as unauthenticated users, and they each trigger `2500` `REST` calls. They have to wait an hour for the rate limit to reset to make any more `REST` calls._
 
 For logged in users, the rate limit is set to their individual GitHub account, e.g.:

 - _Bob and Alice are both logged in, and they each trigger `2500` `REST` calls. They both each still have `2500` `REST` calls left._

If you choose to run the app locally, the rate limit will also be set to your GitHub account.
 
## Tech Stack 🔨 
 - `Node.js` and `Express` backend acting as a wrapper around GitHub's `REST` and `GraphQL` endpoints
 - React
 - Chart.js for pretty charts 📈📊📉
 - Bootstrap
 - GitHub API `GraphQL` and `REST` endpoints
 - Octokit.js - GitHub's handy js library for interacting with the GitHub API
 - Docker
