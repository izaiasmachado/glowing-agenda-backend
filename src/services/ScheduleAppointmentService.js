const moment = require("moment");
const EmailService = require("./EmailService");
const Appointment = require("../models/Appointment");
const { getWorkingHours } = require("./WorkingHoursService");
const { SlotNotAvailableException } = require("../exceptions");
const { getTimeSlots, getDaysArray } = require("../utils");

async function getAppointmentsInDay(date) {
  const dateString = moment(date).format("YYYY-MM-DD");
  return Appointment.find({
    date: dateString,
  });
}

async function filterPastSlots(date, slots) {
  const slotsDate = moment(date);
  const now = moment();

  if (slotsDate.isBefore(now, "day")) {
    return [];
  }

  if (slotsDate.isSame(now, "day")) {
    return slots.filter((slot) => moment(`${date} ${slot}`).isAfter(now));
  }

  return slots;
}

async function getFreeSlots(date) {
  const day = moment(date).day();
  const workingHours = await getWorkingHours();
  const appointments = await getAppointmentsInDay(date);

  const workingHour = workingHours.find((wh) => wh.day === day);

  if (!workingHour) {
    return [];
  }

  const slots = getTimeSlots(workingHour.from, workingHour.to);
  const appointmentsTime = appointments.map((a) => a.time);
  const freeSlots = slots.filter((slot) => !appointmentsTime.includes(slot));
  const availableSlots = filterPastSlots(date, freeSlots);
  return availableSlots;
}

async function getAvailableSlots() {
  const startDay = moment().startOf("week");
  const endDay = moment().endOf("week").add(1, "week");
  const days = await getDaysArray(startDay, endDay);

  const availableDaysSlotsPromise = days.map(async (day) => {
    const slots = await getFreeSlots(day.date);
    return {
      ...day,
      slots,
    };
  });

  return await Promise.all(availableDaysSlotsPromise);
}

const verifySlotAvailable = async (appointment) => {
  const availableDays = await getAvailableSlots();
  const { date, time } = appointment;
  const selectedDay = availableDays.find((d) => d.date == date);

  if (!selectedDay) {
    return false;
  }

  return selectedDay.slots.includes(time);
};

async function scheduleAppointment(appointment) {
  const isSlotAvailable = await verifySlotAvailable(appointment);

  if (!isSlotAvailable) {
    throw new SlotNotAvailableException();
  }

  await EmailService.sendConfirmationMail(appointment);
  return Appointment.create(appointment);
}

module.exports = {
  getAvailableSlots,
  scheduleAppointment,
  verifySlotAvailable,
};
