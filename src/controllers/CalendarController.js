const CalendarService = require("../services/CalendarService");

module.exports = {
  async week(req, res) {
    const { date } = res.locals;
    const calendar = await CalendarService.getWeekSlots(date);
    return res.json(calendar);
  },

  async month(req, res) {
    const { date } = res.locals;
    const calendar = await CalendarService.getMonthSlots(date);
    return res.json(calendar);
  },
};
