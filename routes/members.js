const router = require("express").Router();
const memberController = require("../controllers/memberController.js");

router.post("/member/register", memberController.register);
router.post("/member/login", memberController.login);

module.exports = router;
