const moment = require("moment-timezone");
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
  notificationDate: {
    type: Date,
    required: false,
  },
});

AppointmentSchema.pre("save", async function (next) {
  const appointmentDateTime = `${this.date} ${this.time}`;
  const notificationDate = moment
    .tz(appointmentDateTime, "YYYY-MM-DD HH:mm", "America/Sao_Paulo")
    .subtract(1, "hours");

  this.notificationDate = notificationDate;
  next();
});

module.exports = model("Appointment", AppointmentSchema);
