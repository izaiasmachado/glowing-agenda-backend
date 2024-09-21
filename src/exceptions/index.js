const ExpressException = require("./ExpressException");
const {
  SlotNotAvailableException,
  AppointmentNotFoundException,
} = require("./AppointmentExceptions");
const { EmailAlreadyExistsException } = require("./UserExceptions");

module.exports = {
  ExpressException,
  SlotNotAvailableException,
  AppointmentNotFoundException,
  EmailAlreadyExistsException,
};
