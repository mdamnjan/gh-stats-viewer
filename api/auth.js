import { CLIENT_URL } from "./utils.js";

const cookieOptions =
  process.env.NODE_ENV === "production"
    ? {
        secure: true,
        domain: process.env.DOMAIN,
        maxAge: 8 * 60 * 60 * 1000,
      }
    : { maxAge: 8 * 60 * 60 * 1000 };

export function logout(req, res, next) {
  req.logout(function (err) {
    req.session = null;
    if (err) {
      return next(error, req, res, next);
    }
    res.clearCookie("isGithubAuthenticated", cookieOptions);
    res.end();
  });
}

export function onLogin(req, res) {
  // additional non-httpOnly cookie that can be read client-side
  // purely for nicer UX e.g. show "Log Out" button when user is already logged in
  res.cookie("isGithubAuthenticated", true, {
    sameSite: "lax",
    ...cookieOptions,
  });
  // Successful authentication, redirect home.
  res.redirect(CLIENT_URL);
}
