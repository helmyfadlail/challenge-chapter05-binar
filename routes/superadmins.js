const router = require("express").Router();
const superAdminController = require("../controllers/superAdminController.js");

router.post("/superadmin/login", superAdminController.login);

module.exports = router;
