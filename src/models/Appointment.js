const { Schema, model } = require("../lib/mongoose");

const AppointmentSchema = new Schema({
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  confimed: {
    type: Boolean,
    default: false,
  },
});

module.exports = model("Appointment", AppointmentSchema);
