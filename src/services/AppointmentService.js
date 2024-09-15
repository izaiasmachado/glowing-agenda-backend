const Appointment = require("../models/Appointment");

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
};
