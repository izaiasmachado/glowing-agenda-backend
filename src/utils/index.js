const moment = require("moment");
const { AGENDAMENTOS_JWT_SECRET } = require("../lib/environment");

const cookiesSecurity =
  AGENDAMENTOS_JWT_SECRET === "production" ? "Secure; " : "";
const COOKIE_OPTIONS = `HttpOnly; SameSite=Strict; Path=/; ${cookiesSecurity}`;

function getTimeSlots(start, end) {
  const duration = 30;
  const startTime = moment(start, "HH:mm");
  const endTime = moment(end, "HH:mm").subtract(duration, "minutes");

  if (endTime.isBefore(startTime)) {
    endTime.add(1, "day");
  }

  const slots = [];

  while (startTime <= endTime) {
    slots.push(new moment(startTime).format("HH:mm"));
    startTime.add(30, "minutes");
  }

  return slots;
}

async function getDaysArray(startDate, endDate) {
  const dates = [];
  let currentDate = moment(startDate);
  const stopDate = moment(endDate);

  while (currentDate <= stopDate) {
    dates.push({
      day: currentDate.day(),
      date: moment(currentDate).format("YYYY-MM-DD"),
    });
    currentDate = moment(currentDate).add(1, "days");
  }

  return dates;
}

function setJwtCookie(res, jwt) {
  res.header("Set-Cookie", `authorization=${jwt}; ${COOKIE_OPTIONS}`);
}

module.exports = {
  getTimeSlots,
  getDaysArray,
  setJwtCookie,
};
