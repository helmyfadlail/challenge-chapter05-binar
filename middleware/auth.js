const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;
const response = require("../components/response.js");

const verifyUser = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token || token === null) return response(res, 401, "failed", "Unauthorized request");

  try {
    const splitToken = token.split(" ")[1];
    let verifiedUser = jwt.verify(splitToken, secret);
    if (!verifiedUser) return response(res, 401, "failed", "Access denied");
    req.user = verifiedUser;
    next();
  } catch (error) {
    response(res, 400, "failed", error.message);
  }
};

const isSuperadmin = async (req, res, next) => {
  if (req.user.role === "Superadmin") {
    next();
  } else {
    return response(res, 403, "failed", "Access denied / forbidden");
  }
};

const isAdminOrSuperadmin = async (req, res, next) => {
  const roles = req.user.role;
  if (roles === "Superadmin" || roles === "Admin") {
    next();
  } else {
    return response(res, 403, "failed", "Access denied / forbidden");
  }
};

module.exports = { verifyUser, isSuperadmin, isAdminOrSuperadmin };
