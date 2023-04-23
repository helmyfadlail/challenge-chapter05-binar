const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;
const response = require("../controllers/response.js");
const { superadmin } = require("../models");
const { member } = require("../models");
const { admin } = require("../models");

const verifyUser = async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token || token === null) return response(res, 401, "failed", "Unauthorized request");

  try {
    token = token.split(" ")[0];
    let verifiedUser = jwt.verify(token, secret);
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
    return response(res, 403, "failed", "Access denied / Forbidden");
  }
};

const isAdminOrSuperadmin = async (req, res, next) => {
  const roles = req.user.role;
  if (roles === "Superadmin" || roles === "Admin") {
    next();
  } else {
    return response(res, 403, "failed", "Access denied / Forbidden");
  }
};

const checkCurrentUser = async (req, res, next) => {
  const roles = req.user.role;
  if (roles === "Superadmin") {
    req.user = await superadmin.findByPk(req.user.id).then(() => {
      response(res, 200, "success", `Your role is ${roles}`);
    });
  } else if (roles === "Admin") {
    req.user = await admin.findByPk(req.user.id).then(() => {
      response(res, 200, "success", `Your role is ${roles}`);
    });
  } else {
    req.user = await member.findByPk(req.user.id).then(() => {
      response(res, 200, "success", `Your role is ${roles}`);
    });
  }
};

module.exports = { verifyUser, isSuperadmin, isAdminOrSuperadmin, checkCurrentUser };
