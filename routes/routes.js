const router = require("express").Router();

router.use(require("./cars.js"));
router.use(require("./superadmins.js"));
router.use(require("./admins.js"));
router.use(require("./members.js"));
router.use(require("./checkRole.js"));

module.exports = router;
