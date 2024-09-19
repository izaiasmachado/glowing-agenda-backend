const AppointmentService = require("../services/AppointmentService");

module.exports = {
  async index(req, res) {
    const { search } = res.locals;
    const appointments = await AppointmentService.searchAppointments(search);
    return res.json(appointments);
  },

  async getWeekAppointments(req, res) {
    const { date } = res.locals;
    console.log(date);

    const appointments = await AppointmentService.getWeekAppointments(date);
    return res.json(appointments);
  },

  async getMonthAppointments(req, res) {
    const { date } = res.locals;
    const appointments = await AppointmentService.getMonthAppointments(date);
    return res.json(appointments);
  },

  async create(req, res) {
    const { appointment } = res.locals;
    const createdAppointment = await AppointmentService.createAppointment(
      appointment
    );
    return res.status(201).json(createdAppointment);
  },

  async show(req, res) {
    const { appointmentId } = req.params;
    const appointment = await AppointmentService.getAppointmentById(
      appointmentId
    );
    return res.json(appointment);
  },
};
