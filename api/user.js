import { GhApiClient, getOctokit } from "./utils.js";

export async function getUser(req, res, next) {
  const GhApi = new GhApiClient({ req, res, next });

  return GhApi.rest({
    url: `GET /users/${req.query.user}`,
  });
}

export async function getUserEvents(req, res, next) {
  const GhApi = new GhApiClient({ req, res, next });

  let url;
  if (req.isAuthenticated()) {
    url = `GET /users/${req.query.user}/events?per_page=${req.query.num_events}`;
  } else {
    url = `GET /users/${req.query.user}/events/public?per_page=${req.query.num_events}`;
  }

  return GhApi.rest({ url });
}

export async function getRepos(req, res, next) {
  const GhApi = new GhApiClient({ req, res, next });

  let url;
  if (req.isAuthenticated() && req.user.username == req.query.user) {
    // endpoint returns private repos as well if the Github App is authorized AND installed
    // see https://docs.github.com/en/apps/using-github-apps/authorizing-github-apps#difference-between-authorization-and-installation
    url = `GET /user/repos?sort=pushed`;
  } else {
    url = `GET /users/${req.query.user}/repos?sort=pushed`;
  }

  return GhApi.rest({ url });
}

export async function getRateLimit(req, res, next) {
  const GhApi = new GhApiClient({ req, res, next });

  return GhApi.rest({
    url: "GET /rate_limit",
  });
}

export async function getUserLanguages(req, res, next) {
  const GhApi = new GhApiClient({ req, res, next });

  const processResults = (results) => {
    let languagesAggregate = {};

    results.repositoryOwner.repositories.nodes.forEach((repoNode) => {
      repoNode.languages.edges.forEach((edge) => {
        if (languagesAggregate[edge.node.name]) {
          languagesAggregate[edge.node.name] += edge.size;
        } else {
          languagesAggregate[edge.node.name] = edge.size;
        }
      });
    });
    return languagesAggregate;
  };

  return GhApi.graphql({
    query: `query userLanguages($owner: String!) {
      repositoryOwner(login: $owner) {
        repositories(last:100, isFork:false, orderBy: {field: PUSHED_AT, direction: DESC}) {
          nodes {
            name
            languages(last:100) {
              totalSize
					    edges {
						    size
						      node {
							      name
						      }
					    }
            }
          }
        }
      }
    }`,
    vars: { owner: req.query.user },
    dataHandlerFn: processResults,
  });
}

export async function getUserStarCount(req, res, next) {
  const GhApi = new GhApiClient({ req, res, next });

  const processResults = (results) => {
    let repos = results.repositoryOwner.repositories.nodes;

    const starCount = repos.reduce(
      (accumulator, currentValue) => accumulator + currentValue.stargazerCount,
      0
    );

    let sortedRepos = repos.sort((a, b) => b.stargazerCount - a.stargazerCount);

    const top10Repos = Object.fromEntries(
      sortedRepos.slice(0, 10).map((item) => [item.name, item.stargazerCount])
    );

    return { starCount: starCount, top10Repos: top10Repos };
  };

  let results = await GhApi.graphql({
    query: `query userStarsInitial($owner: String!) {
    repositoryOwner(login: $owner) {
      repositories(first:100, ownerAffiliations:[OWNER], isFork:false, orderBy: {field: STARGAZERS, direction: DESC}) {
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }`,
    vars: { owner: req.query.user },
  });

  if (!results) {
    return
  }

  let pageInfo = results.repositoryOwner.repositories.pageInfo;
  return GhApi.graphql({
    query: `query userStars($owner: String!, $cursor: String!) {
    repositoryOwner(login: $owner) {
      repositories(first:100, ownerAffiliations:[OWNER], isFork:false, after: $cursor, orderBy: {field: STARGAZERS, direction: DESC}) {
        nodes {
         name
         nameWithOwner
         owner {
          login
         }
         stargazerCount
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }`,
    paginate: true,
    vars: { owner: req.query.user, cursor: pageInfo.startCursor },
    dataHandlerFn: processResults,
  });
}
