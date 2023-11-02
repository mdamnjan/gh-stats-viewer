import { getResource } from "./utils.js";

export async function searchUsers(req, res, next) {
  const users = await getResource(
    req,
    res,
    `GET /search/users?q=${req.query.q}&page=${req.query.page}&per_page=${req.query.per_page}`,
    next
  )
  return res.json(users);
}
