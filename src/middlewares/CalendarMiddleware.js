const moment = require("moment");
const zod = require("../lib/zod");

const dateSchema = zod.object({
  date: zod
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
});

module.exports = {
  async ensureValidDate(req, res, next) {
    const rawData = req.query;
    const currentDate = moment().utcOffset(-3).format("YYYY-MM-DD");
    const { success, error, data } = dateSchema.safeParse(rawData);

    if (success) {
      res.locals = { date: data.date || currentDate };
      return next();
    }

    const formatted = error.format();
    return res.status(400).json({ error: formatted });
  },
};
