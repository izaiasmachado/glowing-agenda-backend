const zod = require("../lib/zod");

const userCreationSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6),
  name: zod.string().min(2).max(255),
});

module.exports = {
  async validateUserCreation(req, res, next) {
    const rawData = req.body;
    const { success, error, data } = userCreationSchema.safeParse(rawData);

    if (success) {
      res.locals.user = data;
      return next();
    }

    const formatted = error.format();
    return res.status(400).json({ error: formatted });
  },
};
