const { Schema, model } = require("../lib/mongoose");

const AppointmentSchema = new Schema({
  date: String,
  time: String,
});

module.exports = model("Appointment", AppointmentSchema);
