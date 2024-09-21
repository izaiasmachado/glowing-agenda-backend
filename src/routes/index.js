const express = require("express");
const router = express.Router();

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
router.use("/appointment", appointmentRouter);
router.use("/calendar", calendarRouter);

module.exports = router;
