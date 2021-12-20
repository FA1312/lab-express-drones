const express = require("express");
const router = express.Router();

const Drone = require("../models/Drone.model");

router.get("/drones", (req, res, next) => {
  Drone.find()
    .then((data) => {
      console.log("Data", data);
      res.render("drones/list", {
        drones: data,
      });
    })
    .catch((error) => {
      console.log("Error while getting drones from the DB: ", error);
      next(error);
    });
});

router.get("/drones/create", (req, res, next) => {
  res.render("drones/create-form");
});

router.post("/drones/create", (req, res, next) => {
  const { name, propellers, maxSpeed } = req.body;

  Drone.create({ name, propellers, maxSpeed })
    .then(() => res.redirect("/drones"))
    .catch((err) => {
      console.log("Error while getting drones from the DB: '", err);
      res.render("drones/create-form");
    });
});

router.get("/drones/:id/edit", async (req, res, next) => {
  try {
    const droneId = req.params.id;
    const droneToEdit = await Drone.findById(droneId);
    res.render("drones/update-form.hbs", { droneToEdit });
  } catch (error) {
    console.error(`Error while routing to update-form-hbs: ${error}`);
  }
});

router.post("/drones/:id/edit", async (req, res, next) => {
  try {
    const droneId = req.params.id;
    const newDrone = req.body;
    const droneToEdit = await Drone.findByIdAndUpdate(droneId, newDrone);
    res.redirect("/drones");
  } catch (error) {
    console.error("Error while updating drone", error);
  }
});

router.post("/drones/:id/delete", (req, res, next) => {
  const { id } = req.params;
  Drone.findByIdAndDelete(id)
    .then(() => {
      res.redirect("/drones");
    })
    .catch((err) => {
      console.log("Error", err);
      res.send("Error al eliminar el drone");
    });
});

module.exports = router;
