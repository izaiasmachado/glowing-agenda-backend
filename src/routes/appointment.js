const express = require("express");
const router = express.Router();

const AppointmentController = require("../controllers/AppointmentController");
const AppointmentMiddleware = require("../middlewares/AppointmentMiddleware");

router.get(
  "/",
  AppointmentMiddleware.isSearchValid,
  AppointmentController.index
);
router.get("/:appointmentId", AppointmentController.show);
router.post(
  "/",
  AppointmentMiddleware.validateAppointmentCreation,
  AppointmentController.create
);
router.delete("/:appointmentId", AppointmentController.delete);

module.exports = router;
