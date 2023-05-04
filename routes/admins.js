const router = require("express").Router();
const adminController = require("../controllers/adminController.js");
const { verifyUser, isSuperadmin } = require("../middleware/auth.js");

router.post("/admin/login", adminController.login);
router.post("/superadmin/create/admin", verifyUser, isSuperadmin, adminController.createAdmin);
router.put("/superadmin/update/admin/:id", verifyUser, isSuperadmin, adminController.updateAdmin);
router.delete("/superadmin/delete/admin/:id", verifyUser, isSuperadmin, adminController.deleteAdmin);

module.exports = router;
