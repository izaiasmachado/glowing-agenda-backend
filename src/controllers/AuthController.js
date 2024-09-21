const UserService = require("../services/UserService");
const AuthService = require("../services/AuthService");
const { setJwtCookie } = require("../utils");

module.exports = {
  async register(req, res) {
    const { user } = res.locals;
    const createdUser = await UserService.create(user);
    return res.status(201).json(createdUser);
  },

  async login(req, res) {
    const { user } = res.locals;
    const foundUser = await UserService.findUserByEmailAndPassword(user);
    const token = await AuthService.signUserToken(foundUser);
    setJwtCookie(res, token);
    return res.sendStatus(200);
  },
};
