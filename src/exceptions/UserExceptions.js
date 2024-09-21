const ExpressException = require("./ExpressException");

class EmailAlreadyExistsException extends ExpressException {
  constructor() {
    super("E-mail já cadastrado", 400);
  }
}

class UserNotFoundException extends ExpressException {
  constructor() {
    super("Usuário não encontrado", 404);
  }
}

class EmailOrPasswordIncorrectException extends ExpressException {
  constructor() {
    super("E-mail ou senha incorretos", 400);
  }
}

module.exports = {
  EmailAlreadyExistsException,
  UserNotFoundException,
  EmailOrPasswordIncorrectException,
};
