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

  return nodemailer.sendMail(options);
}

module.exports = { sendConfirmationMail };
