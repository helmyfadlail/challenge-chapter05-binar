const router = require("express").Router();
const authController = require("../controllers/authController.js");
const { verifyUser } = require("../middleware/auth.js");

router.get("/checkuser", verifyUser, authController.checkCurrentUser);

module.exports = router;
