const ExpressException = require("./ExpressException");

class SlotNotAvailableException extends ExpressException {
  constructor() {
    super("Horário não disponível para agendamento", 405);
  }
}

module.exports = {
  SlotNotAvailableException,
};
