export const getLastUpdatedString = (lastUpdated) => {
  const lastUpdatedISO = new Date(lastUpdated)
  const currentTimeISO = new Date(Date())

  const numDays = currentTimeISO.getDate() - lastUpdatedISO.getDate();

  if (numDays <= 0) {
    const numHours = currentTimeISO.getHours() - lastUpdatedISO.getHours();
    if (numHours <= 0) {
      const numSeconds =
        currentTimeISO.getSeconds() - lastUpdatedISO.getSeconds();
      return `Last updated: ${numSeconds}(s) ago`;
    } else {
      return `Last updated: ${numHours} hour(s) ago`;
    }
  } else {
    return `Last updated: ${numDays} day(s) ago`;
  }
};


export const BACKEND_URL = "https://gh-stats-viewer-api.up.railway.app"