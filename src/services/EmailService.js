const moment = require("moment");
const nodemailer = require("../lib/nodemailer");

function buildConfirmationEmailText(appointment) {
  const appointmentDateTime = moment(
    `${appointment.date} ${appointment.time}`,
    "YYYY-MM-DD HH:mm"
  );
  const formattedDateTime = appointmentDateTime.format("DD/MM/YYYY [às] HH:mm");

  let text = `Olá ${appointment.name},\n\n`;
  text += `Seu agendamento foi confirmado para o dia ${formattedDateTime}.\n\n`;
  text += "Atenciosamente,\n";
  text += "Equipe de agendamentos";
  return text;
}

async function sendConfirmationMail(appointment) {
  const options = {
    to: appointment.email,
    subject: "Confirmação de agendamento",
    text: buildConfirmationEmailText(appointment),
  };

  return new Promise((resolve, reject) => {
    nodemailer.sendMail(options, (error, info) => {
      if (error) return reject(error);
      return resolve(info);
    });
  });
}

async function buildNotificationEmailText(appointment) {
  const appointmentDateTime = moment(
    `${appointment.date} ${appointment.time}`,
    "YYYY-MM-DD HH:mm"
  );
  const formattedDateTime = appointmentDateTime.format("DD/MM/YYYY [às] HH:mm");
  let text = `Olá ${appointment.name},\n\n`;
  text += `Este é um lembrete de que você tem um agendamento em 1 hora.\n`;
  text += `Agendamento: ${formattedDateTime}.\n\n`;
  text += "Atenciosamente,\n";
  text += "Equipe de agendamentos";
  return text;
}

async function sendNotificationMail(appointment) {
  console.log(appointment);
  const options = {
    to: appointment.email,
    subject: "Lembrete de agendamento",
    text: await buildNotificationEmailText(appointment),
  };

  return new Promise((resolve, reject) => {
    nodemailer.sendMail(options, (error, info) => {
      if (error) return reject(error);
      return resolve(info);
    });
  });
}

module.exports = { sendConfirmationMail, sendNotificationMail };
