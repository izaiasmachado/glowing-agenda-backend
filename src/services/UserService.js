const bcrypt = require("../lib/bcrypt");
const User = require("../models/User");
const { EmailAlreadyExistsException } = require("../exceptions/UserExceptions");

module.exports = {
  async create(userData) {
    const userExists = await User.findOne({ email: userData.email });

    if (userExists) {
      throw new EmailAlreadyExistsException();
    }

    const hashedPassword = await bcrypt.hashPassword(userData.password);
    const user = {
      ...userData,
      password: hashedPassword,
    };

    const createdUser = await User.create(user);
    return this._serialize(createdUser);
  },

  _serialize(user) {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
    };
  },
};
