const express = require("express");
const router = express.Router();

const ScheduleAppointmentMiddleware = require("./middlewares/ScheduleAppointmentMiddleware");
const ScheduleAppointmentController = require("./controllers/ScheduleAppointmentController");
const AppointmentController = require("./controllers/AppointmentController");

router.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

router.get("/available", ScheduleAppointmentController.index);
router.post(
  "/schedule",
  ScheduleAppointmentMiddleware.validateAppointmentSchedule,
  ScheduleAppointmentController.create
);
router.get("/appointments", AppointmentController.index);

module.exports = router;
