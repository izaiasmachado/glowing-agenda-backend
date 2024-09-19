const express = require("express");
const router = express.Router();

const AppointmentMiddleware = require("./middlewares/AppointmentMiddleware");
const ScheduleAppointmentMiddleware = require("./middlewares/ScheduleAppointmentMiddleware");
const CalendarMiddleware = require("./middlewares/CalendarMiddleware");

const AppointmentController = require("./controllers/AppointmentController");
const ScheduleAppointmentController = require("./controllers/ScheduleAppointmentController");
const CalendarController = require("./controllers/CalendarController");

router.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

router.get("/available", ScheduleAppointmentController.index);
router.post(
  "/schedule",
  ScheduleAppointmentMiddleware.validateAppointmentSchedule,
  ScheduleAppointmentController.create
);
router.get(
  "/appointments",
  AppointmentMiddleware.isSearchValid,
  AppointmentController.index
);

router.get("/appointment/:appointmentId", AppointmentController.show);

router.post(
  "/appointment",
  AppointmentMiddleware.validateAppointmentCreation,
  AppointmentController.create
);

router.get(
  "/calendar/week",
  CalendarMiddleware.ensureValidDate,
  CalendarController.week
);

router.get(
  "/calendar/month",
  CalendarMiddleware.ensureValidDate,
  CalendarController.month
);

module.exports = router;
