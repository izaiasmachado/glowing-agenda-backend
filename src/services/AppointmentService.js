const Appointment = require("../models/Appointment");
const moment = require("moment");

async function getAllAppointments() {
  return Appointment.find();
}

async function searchAppointments(search) {
  return Appointment.find({
    $or: [
      { name: { $regex: search, $options: "i" } },
      { cpf: { $regex: search, $options: "i" } },
    ],
  });
}

async function searchAppointmentByDate(start, end) {
  const startDateString = moment(start).format("YYYY-MM-DD");
  const endDateString = moment(end).format("YYYY-MM-DD");

  return Appointment.find({
    date: {
      $gte: startDateString,
      $lt: endDateString,
    },
  });
}

async function getWeekAppointments(date) {
  const startDay = moment(date).startOf("week");
  const endDay = moment(date).endOf("week").add(1, "week");
  return searchAppointmentByDate(startDay, endDay);
}

async function getMonthAppointments(date) {
  const startDay = moment(date).startOf("month");
  const endDay = moment(date).endOf("month").add(1, "month");
  return searchAppointmentByDate(startDay, endDay);
}

async function getAppointmentsToNotify() {
  const now = new Date();
  const startOfCurrentMinute = new Date(now.setSeconds(0, 0));
  const endOfCurrentMinute = new Date(
    startOfCurrentMinute.getTime() + 60 * 1000
  );

  return await Appointment.find({
    notificationDate: {
      $gte: startOfCurrentMinute,
      $lt: endOfCurrentMinute,
    },
  });
}

module.exports = {
  getAllAppointments,
  searchAppointments,
  getAppointmentsToNotify,
  getWeekAppointments,
  getMonthAppointments,
};
