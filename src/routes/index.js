const express = require("express");
const router = express.Router();

// const AuthMiddleware = require("../middlewares/AuthMiddleware");
const ScheduleAppointmentController = require("../controllers/ScheduleAppointmentController");
const ScheduleAppointmentMiddleware = require("../middlewares/ScheduleAppointmentMiddleware");

router.get("/available", ScheduleAppointmentController.index);
router.post(
  "/schedule",
  ScheduleAppointmentMiddleware.validateAppointmentSchedule,
  ScheduleAppointmentController.create
);

router.get("/", () => {
  res.json({ message: "Hello World!" });
});

const authRouter = require("./auth");
const calendarRouter = require("./calendar");
const appointmentRouter = require("./appointment");

router.use("/auth", authRouter);

// AuthMiddleware.ensureUserIsAuthenticated,
router.use("/appointment", appointmentRouter);
// AuthMiddleware.ensureUserIsAuthenticated,
router.use("/calendar", calendarRouter);

module.exports = router;
