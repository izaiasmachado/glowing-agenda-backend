const UserService = require("../services/UserService");

module.exports = {
  async register(req, res) {
    const { user } = res.locals;
    const createdUser = await UserService.create(user);
    return res.status(201).json(createdUser);
  },
};
