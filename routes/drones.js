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

router.get("/drones/:id/edit", (req, res, next) => {
  const { id } = req.params;
  Drone.findById()
    .then((drone) => {
      console.log("drone", drone);
      res.render("drones/update-form.hbs", { drone });
    })
    .catch((err) => {
      console.log("Error", err);
      res.send("Error al editar el drone");
    });
});

router.post("/drones/:id/edit", (req, res, next) => {
  const { id } = req.params;
  const { name, propellers, maxSpeed, ...rest } = req.body;
  Drone.findByIdAndUpdate(id, { name, propellers, maxSpeed })
    .then((drone) => {
      console.log("Drone", drone);
      res.redirect("/drones");
    })
    .catch((err) => {
      console.log("Error", err);
      res.send("Error al editar el drone");
    });
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
