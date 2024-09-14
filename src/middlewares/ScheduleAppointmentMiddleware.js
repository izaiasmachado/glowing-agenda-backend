const zod = require("../lib/zod");

const scheduleAppointmentSchema = zod.object({
  time: zod
    .string()
    .length(5)
    .regex(/^\d{2}:\d{2}$/),
  date: zod
    .string()
    .length(10)
    .regex(/^\d{4}-\d{2}-\d{2}$/),
  cpf: zod.string().length(11).regex(/^\d+$/),
  name: zod.string().min(1).max(255),
  email: zod.string().email().max(255),
});

module.exports = {
  async validateAppointmentSchedule(req, res, next) {
    const rawData = req.body;
    const { success, error, data } =
      scheduleAppointmentSchema.safeParse(rawData);

    if (success) {
      res.locals.appointment = data;
      return next();
    }

    const formatted = error.format();
    return res.status(400).json({ error: formatted });
  },
};
