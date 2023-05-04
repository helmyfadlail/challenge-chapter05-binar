const { superadmin, member, admin } = require("../models");
const response = require("../components/response.js");

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

module.exports = { checkCurrentUser };
