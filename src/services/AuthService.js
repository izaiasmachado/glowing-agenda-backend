const jwt = require("../lib/jwt");

module.exports = {
  async signUserToken(user) {
    try {
      const token = await jwt.sign({ id: user.id });
      return token;
    } catch (error) {
      return null;
    }
  },

  async decodeUserToken(token) {
    try {
      const decoded = await jwt.verify(token);
      return decoded;
    } catch (error) {
      return null;
    }
  },
};
