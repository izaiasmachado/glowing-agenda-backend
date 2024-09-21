const zod = require("../lib/zod");
const UserService = require("../services/UserService");
const AuthService = require("../services/AuthService");

const userCreationSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6),
  name: zod.string().min(2).max(255),
});

const userLoginSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6),
});

module.exports = {
  async ensureUserIsAuthenticated(req, res, next) {
    const token = req.cookies?.authorization;
    const tokenPayload = await AuthService.decodeUserToken(token);
    const userExists = await UserService.findUserById(tokenPayload?.id);

    if (!token || !tokenPayload || !userExists) {
      return res
        .status(401)
        .json({ error: { message: "Usuário não autenticado" } });
    }

    res.locals.user = userExists;
    return next();
  },

  async handleEnsureUserIsAuthenticated(req, res, next) {
    const token = req.cookies?.authorization;
    console.log(token);
    const tokenPayload = await AuthService.decodeUserToken(token);
    const userExists = await UserService.findUserById(tokenPayload?.id);

    if (!token || !tokenPayload || !userExists) {
      throw new Error("Usuário não autenticado");
    }

    res.locals.user = userExists;
    return next();
  },

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

  async validateUserLogin(req, res, next) {
    const rawData = req.body;
    const { success, error, data } = userLoginSchema.safeParse(rawData);

    if (success) {
      res.locals.user = data;
      return next();
    }

    const formatted = error.format();
    return res.status(400).json({ error: formatted });
  },
};
