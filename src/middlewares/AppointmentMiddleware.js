const zod = require("../lib/zod");
const moment = require("moment");

const searchSchema = zod.object({
  search: zod.string().min(1).max(255).optional(),
});

const dateSchema = zod.object({
  date: zod
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
});

module.exports = {
  async isSearchValid(req, res, next) {
    const rawData = req.query;
    const { success, error, data } = searchSchema.safeParse(rawData);

    if (success) {
      res.locals = { search: data.search || "" };
      return next();
    }

    const formatted = error.format();
    return res.status(400).json({ error: formatted });
  },

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
