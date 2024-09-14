const AppointmentService = require("../services/AppointmentService");

module.exports = {
  async index(req, res) {
    const { search } = res.locals;
    const appointments = await AppointmentService.searchAppointments(search);
    return res.json(appointments);
  },
};
