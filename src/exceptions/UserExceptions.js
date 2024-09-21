const ExpressException = require("./ExpressException");

class EmailAlreadyExistsException extends ExpressException {
  constructor() {
    super("E-mail já cadastrado", 400);
  }
}

module.exports = {
  EmailAlreadyExistsException,
};
