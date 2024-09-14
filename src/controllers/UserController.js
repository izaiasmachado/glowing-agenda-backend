const User = require("../models/User");
const zod = require("zod");

const createUserSchema = zod.object({
  name: zod.string(),
  email: zod.string().email(),
  password: zod.string().min(6),
});

module.exports = {
  async index(req, res) {
    const users = await User.find({});
    res.json(users);
  },

  async show(req, res) {
    const userExists = await User.findById(req.params.id);

    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json(userExists);
  },

  async create(req, res) {
    const { success, error, data } = createUserSchema.safeParse(req.body);

    if (!success) {
      return res.status(400).json({ error });
    }

    return await User.create(data);
  },
};
