const zod = require("../lib/zod");

const searchSchema = zod.object({
  search: zod.string().min(1).max(255).optional(),
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
};
