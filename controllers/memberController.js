const { member } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;
const response = require("../components/response.js");

const register = async (req, res) => {
  const { username, phone, email, password } = req.body;
  try {
    const checkAdmin = await member.findOne({ where: { email, username } });
    if (checkAdmin) return response(res, 400, "failed", "Admin already exists");

    const hashPassword = await bcrypt.hash(password, 10);
    await member.create({ username, phone, email, password: hashPassword }).then((user) => {
      response(res, 201, "success", "Successfully created a new member", user);
    });
  } catch (error) {
    response(res, 404, "failed", error.message);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    await member.findOne({ where: { email } }).then(async (user) => {
      if (!user) return response(res, 400, "failed", "Please input a valid email");

      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) return response(res, 400, "failed", "Wrong password!");

      const email = user.email;
      const token = jwt.sign({ email, role: "Member" }, secret, { expiresIn: "1h" });
      res.status(200).json({ status: "success", role: "member", token });
    });
  } catch (error) {
    response(res, 404, "failed", error.message);
  }
};

module.exports = { login, register };
