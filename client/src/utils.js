import axios from "axios";

const formatDateString = (elapsedTime, unit) => {
  let time = Math.floor(elapsedTime);
  if (time > 1) {
    return `Last updated: ${time} ${unit}s ago`;
  } else {
    return `Last updated: ${time} ${unit} ago`;
  }
};

export const getLastUpdatedString = (lastUpdated) => {
  const lastUpdatedISO = new Date(lastUpdated);
  const currentTimeISO = new Date(Date());

  const numSeconds = Math.abs(currentTimeISO - lastUpdatedISO) / 1000;
  const numMinutes = numSeconds / 60;
  const numHours = numMinutes / 60;
  const numDays = numHours / 24;
  const numMonths = numDays / 30;
  const numYears = numMonths / 12;

  if (numYears > 1) {
    return formatDateString(numYears, "year");
  }

  if (numMonths > 1) {
    return formatDateString(numMonths, "month");
  }

  if (numDays > 1) {
    return formatDateString(numDays, "day");
  }

  if (numHours > 1) {
    return formatDateString(numHours, "hour");
  }
  if (numMinutes > 1) {
    return formatDateString(numMinutes, "minute");
  }

  if (numSeconds > 1) {
    return formatDateString(numSeconds, "second");
  }
};

export const SERVER_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_SERVER_URL
    : "http://localhost:4000";

export const fetchData = async ({ url, setData, setError, setIsLoading }) => {
  const results = await axios
    .get(`${SERVER_URL}/${url}`, {
      withCredentials: true,
    })
    .catch((error) => {
      console.log("repo stats error", error);
      if (setError) {
        setError(error);
      }
    });
  if (setIsLoading) {
    setIsLoading(false);
  }
  if (results) {
    console.log(url, results.data);
    setData(results.data);
  }
};
