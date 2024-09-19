const express = require("express");
const router = express.Router();

const AppointmentMiddleware = require("./middlewares/AppointmentMiddleware");
const ScheduleAppointmentMiddleware = require("./middlewares/ScheduleAppointmentMiddleware");
const ScheduleAppointmentController = require("./controllers/ScheduleAppointmentController");
const AppointmentController = require("./controllers/AppointmentController");
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
  "/appointments/week",
  AppointmentMiddleware.ensureValidDate,
  AppointmentController.getWeekAppointments
);

router.get(
  "/appointments/month",
  AppointmentMiddleware.ensureValidDate,
  AppointmentController.getMonthAppointments
);

router.get(
  "/calendar/week",
  AppointmentMiddleware.ensureValidDate,
  CalendarController.week
);
router.get(
  "/calendar/month",
  AppointmentMiddleware.ensureValidDate,
  CalendarController.month
);

module.exports = router;
