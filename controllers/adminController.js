const { admin } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;
const response = require("../components/response.js");

const createAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    await admin.findOne({ where: { email, name } }).then((user) => {
      if (user) return response(res, 400, "failed", "Admin already exists");
    });
    const hashPassword = await bcrypt.hash(password, 10);
    await admin.create({ email, password: hashPassword }).then((user) => {
      response(res, 201, "success", "Successfully created a new admin", user);
    });
  } catch (error) {
    response(res, 404, "failed", error.message);
  }
};

const updateAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  const id = req.params.id;
  const findAdmin = await admin.findOne({ where: { id } });
  if (findAdmin.email === email || findAdmin.name === name) {
    return response(res, 400, "failed", "Admin already exists");
  } else {
    try {
      const hashPassword = await bcrypt.hash(password, 10);
      await admin.update({ name, email, password: hashPassword }, { where: { id } }).then(() => {
        response(res, 201, "success", `Car with id ${id} has been updated successfully`);
      });
    } catch (error) {
      response(res, 400, "failed", error.message);
    }
  }
};

const deleteAdmin = async (req, res) => {
  const id = req.params.id;

  try {
    await admin.destroy({ where: { id } }).then(() => {
      response(res, 201, "success", `Admin with id ${id} has been deleted successfully`);
    });
  } catch (error) {
    response(res, 400, "failed", error.message);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    await admin.findOne({ where: { email } }).then(async (user) => {
      if (!user) return response(res, 400, "failed", "Please input a valid email");

      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) return response(res, 400, "failed", "Wrong password!");

      const email = user.email;
      const token = jwt.sign({ email, role: "Admin" }, secret, { expiresIn: "1h" });
      res.status(200).json({ status: "success", role: "admin", token });
    });
  } catch (error) {
    response(res, 404, "failed", error.message);
  }
};

module.exports = { createAdmin, updateAdmin, deleteAdmin, login };
