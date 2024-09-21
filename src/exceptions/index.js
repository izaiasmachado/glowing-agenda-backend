const ExpressException = require("./ExpressException");
const {
  SlotNotAvailableException,
  AppointmentNotFoundException,
} = require("./AppointmentExceptions");
const {
  EmailAlreadyExistsException,
  UserNotFoundException,
  EmailOrPasswordIncorrectException,
} = require("./UserExceptions");

module.exports = {
  ExpressException,
  SlotNotAvailableException,
  AppointmentNotFoundException,
  EmailAlreadyExistsException,
  UserNotFoundException,
  EmailOrPasswordIncorrectException,
};
