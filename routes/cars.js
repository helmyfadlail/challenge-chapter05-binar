const router = require("express").Router();
const carsController = require("../controllers/carsController.js");
const { verifyUser, isAdminOrSuperadmin } = require("../middleware/auth.js");
const upload = require("../middleware/uploader.js");

// car routes
router.get("/car", carsController.getAllCars);
router.post("/car", upload, verifyUser, isAdminOrSuperadmin, carsController.createCar);
router.put("/car/:id", upload, verifyUser, isAdminOrSuperadmin, carsController.updateCar);
router.delete("/car/:id", verifyUser, isAdminOrSuperadmin, carsController.deleteCar);

module.exports = router;
