const jwt = require("../lib/jwt");

module.exports = {
  async signUserToken(user) {
    const token = await jwt.sign({ id: user.id });
    return token;
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
