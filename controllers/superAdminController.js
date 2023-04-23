const { superadmin } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;
const response = require("./response");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    await superadmin.findOne({ where: { email } }).then(async (user) => {
      if (!user) return response(res, 404, "failed", "Please input a valid email");

      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) return response(res, 404, "failed", "Wrong password!");

      const email = user.email;
      const token = jwt.sign({ email, role: "Superadmin" }, secret, { expiresIn: "1h" });
      res.status(200).json({ status: "success", role: "superadmin", token });
    });
  } catch (error) {
    response(res, 400, "failed", error.message);
  }
};

module.exports = { login };
