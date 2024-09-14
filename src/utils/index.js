const moment = require("moment");

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

module.exports = {
  getTimeSlots,
  getDaysArray,
};
