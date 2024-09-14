const moment = require("moment");
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
  return slots.filter((slot) => !appointmentsTime.includes(slot));
}

async function getAvailableSlots() {
  const numberOfDays = 7;
  const startDay = moment();
  const endDay = moment().add(numberOfDays, "days");
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

  return Appointment.create(appointment);
}

module.exports = {
  getAvailableSlots,
  scheduleAppointment,
};
