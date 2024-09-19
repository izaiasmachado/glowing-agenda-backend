const moment = require("moment");
const { getWorkingHoursInDay } = require("./WorkingHoursService");
const { getAppointmentsInDay } = require("./AppointmentService");
const { getTimeSlots } = require("../utils");

async function getDaySlots(date) {
  const day = moment(date).day();
  const dateString = moment(date).format("YYYY-MM-DD");
  const workingHours = await getWorkingHoursInDay(day);

  if (!workingHours) {
    return [];
  }

  const timeSlots = getTimeSlots(workingHours.from, workingHours.to);
  const appointments = await getAppointmentsInDay(date);

  return timeSlots.map((timeSlot) => {
    const now = moment();
    const appointment = appointments.find(
      (appointment) => appointment.time === timeSlot
    );

    return {
      time: timeSlot,
      appointmentId: appointment ? appointment._id : null,
      isFree: !appointment,
      isPast: !moment(`${dateString} ${timeSlot}`).isAfter(now),
    };
  });
}

async function getDayCalendar(date) {
  const slots = await getDaySlots(date);

  return {
    date: moment(date).format("YYYY-MM-DD"),
    slots,
  };
}

async function getWeekSlots(date) {
  const week = [];
  const startDay = moment(date).startOf("week");
  const endDay = moment(date).endOf("week");

  for (let day = startDay; day.isSameOrBefore(endDay); day.add(1, "day")) {
    week.push(await getDayCalendar(day));
  }

  return week;
}

async function getMonthSlots(date) {
  const month = [];
  const startDay = moment(date).startOf("month");
  const endDay = moment(date).endOf("month");

  for (let day = startDay; day.isSameOrBefore(endDay); day.add(1, "day")) {
    month.push(await getDayCalendar(day));
  }

  return month;
}

module.exports = { getDaySlots, getWeekSlots, getMonthSlots, getDayCalendar };
