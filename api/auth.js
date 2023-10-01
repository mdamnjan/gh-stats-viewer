import { CLIENT_URL } from "./utils.js";

export function logout(req, res, next) {
  res.clearCookie("ghStatsSession");
  res.clearCookie("isGithubAuthenticated");
  req.logout(function (err) {
    req.session = null;
    if (err) {
      return next(error, req, res, next);
    }
    res.redirect(CLIENT_URL);
  });
}

export function onLogin(req, res) {
  const cookieOptions =
    process.env.NODE_ENV === "production"
      ? { secure: true, domain: process.env.DOMAIN }
      : {};
  // additional non-httpOnly cookie that can be read client-side
  // purely for nicer UX e.g. show "Log Out" button when user is already logged in
  res.cookie("isGithubAuthenticated", true, {
    ...cookieOptions,
    maxAge: 8 * 60 * 60 * 1000,
  });
  // Successful authentication, redirect home.
  res.redirect(CLIENT_URL);
}
