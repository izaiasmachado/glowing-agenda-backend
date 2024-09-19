const ExpressException = require("./ExpressException");

class SlotNotAvailableException extends ExpressException {
  constructor() {
    super("Horário não disponível para agendamento", 405);
  }
}

class AppointmentNotFoundException extends ExpressException {
  constructor() {
    super("Agendamento não encontrado", 404);
  }
}

module.exports = {
  SlotNotAvailableException,
  AppointmentNotFoundException,
};
