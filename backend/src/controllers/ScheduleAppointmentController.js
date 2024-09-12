const ScheduleAppointmentService = require("../services/ScheduleAppointmentService");

module.exports = {
  async index(req, res) {
    const availableDays = await ScheduleAppointmentService.getAvailableSlots();
    return res.json(availableDays);
  },

  async create(req, res) {
    const { appointment } = res.locals;
    const scheduledAppointment =
      await ScheduleAppointmentService.scheduleAppointment(appointment);
    return res.json(scheduledAppointment);
  },
};
