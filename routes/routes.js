const express = require("express");
const carsController = require("../controllers/carsController.js");
const superAdminController = require("../controllers/superAdminController.js");
const adminController = require("../controllers/adminController.js");
const memberController = require("../controllers/memberController.js");
const authController = require("../controllers/authController.js");
const { verifyUser, isSuperadmin, isAdminOrSuperadmin } = require("../middleware/auth.js");
const upload = require("../middleware/uploader.js");

const router = express.Router();

// car routes
router.get("/car", carsController.getAllCars);
router.post("/car", upload, verifyUser, isAdminOrSuperadmin, carsController.createCar);
router.put("/car/:id", upload, verifyUser, isAdminOrSuperadmin, carsController.updateCar);
router.delete("/car/:id", verifyUser, isAdminOrSuperadmin, carsController.deleteCar);

// superadmin routes
router.post("/superadmin/login", superAdminController.login);
router.post("/superadmin/create/admin", verifyUser, isSuperadmin, adminController.createAdmin);
router.put("/superadmin/update/admin/:id", verifyUser, isSuperadmin, adminController.updateAdmin);
router.delete("/superadmin/delete/admin/:id", verifyUser, isSuperadmin, adminController.deleteAdmin);

// admin routes
router.post("/admin/login", adminController.login);

// member routes
router.post("/member/register", memberController.register);
router.post("/member/login", memberController.login);

// check current user
router.get("/checkuser", verifyUser, authController.checkCurrentUser);

module.exports = router;
