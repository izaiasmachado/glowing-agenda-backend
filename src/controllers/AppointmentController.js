const Appointment = require("../models/Appointment");

module.exports = {
  async index(req, res) {
    const appointments = await Appointment.find();
    return res.json(appointments);
  },
};
