const router = require("express").Router();
const checkRoleController = require("../controllers/checkRoleController.js");
const { verifyUser } = require("../middleware/auth.js");

router.get("/checkuser", verifyUser, checkRoleController.checkCurrentUser);

module.exports = router;
