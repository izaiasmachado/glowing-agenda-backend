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

module.exports = {
  getAllAppointments,
  searchAppointments,
};
