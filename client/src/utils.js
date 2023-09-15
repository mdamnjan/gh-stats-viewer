import axios from "axios";

export const getLastUpdatedString = (lastUpdated) => {
  const lastUpdatedISO = new Date(lastUpdated);
  const currentTimeISO = new Date(Date());

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

export const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://gh-stats-viewer-api.up.railway.app"
    : "http://localhost:4000";

export const fetchData = async ({ url, setData, setError }) => {
  const results = await axios
    .get(`${BACKEND_URL}/${url}`, {
      withCredentials: true,
    })
    .catch((error) => {
      console.log("repo stats error");
      if (setError) {
        setError(error);
      }
    });
  setData(results.data);
};
