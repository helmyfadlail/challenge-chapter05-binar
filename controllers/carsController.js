const { uploadToImagekit } = require("../lib/imageKit");
const { car } = require("../models");
const response = require("../components/response.js");

const getAllCars = async (req, res) => {
  try {
    await car.findAll({ where: { isDeleted: false } }).then((cars) => {
      response(res, 200, "success", "Success get all cars", cars);
    });
  } catch (error) {
    response(res, 404, "failed", error.message);
  }
};

const createCar = async (req, res) => {
  const { name, rentPrice } = req.body;
  const createdBy = req.user.email;

  if (req.file === undefined && name === undefined && rentPrice === undefined) {
    return response(res, 400, "failed", "Please input relevant data");
  } else {
    const img = await uploadToImagekit(req);

    try {
      await car.create({ name, rentPrice, image: img.url, createdBy: createdBy }).then((car) => {
        response(res, 201, "success", "Successfully created a car", car);
      });
    } catch (error) {
      response(res, 400, "failed", error.message);
    }
  }
};

const updateCar = async (req, res) => {
  const { name, rentPrice } = req.body;
  const id = req.params.id;
  const updatedBy = req.user.email;
  const findCar = await car.findByPk(id);

  let updateImage = "";
  if (req.file === undefined) {
    updateImage = findCar.image;
  } else if (req.file) {
    if (req.file.size > 3000000) {
      response(res, 400, "failed", "Image should be no more than 3MB");
    }
    const img = await uploadToImagekit(req);
    updateImage = img.url;
  }

  if (!findCar) {
    response(res, 404, "failed", `Car with id ${id} not found`);
  } else {
    try {
      await car.update({ name, rentPrice, image: updateImage, updatedBy: updatedBy }, { where: { id } }).then(() => {
        response(res, 201, "success", `Car with id ${id} has been updated successfully`);
      });
    } catch (error) {
      response(res, 400, "failed", error.message);
    }
  }
};

const deleteCar = async (req, res) => {
  const id = req.params.id;
  const deletedBy = req.user.email;
  console.log(req.user);

  try {
    await car.update({ isDeleted: true, deletedBy: deletedBy }, { where: { id } }).then(() => {
      response(res, 201, "success", `Car with id ${id} has been deleted successfully`);
    });
  } catch (error) {
    response(res, 400, "failed", error.message);
  }
};

module.exports = { getAllCars, createCar, updateCar, deleteCar };
