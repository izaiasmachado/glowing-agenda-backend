const ExpressException = require("./ExpressException");
const {
  SlotNotAvailableException,
  AppointmentNotFoundException,
} = require("./AppointmentExceptions");

module.exports = {
  ExpressException,
  SlotNotAvailableException,
  AppointmentNotFoundException,
};
