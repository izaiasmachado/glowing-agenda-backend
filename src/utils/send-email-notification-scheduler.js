const cron = require("node-cron");
const EmailService = require("../services/EmailService");
const AppointmentService = require("../services/AppointmentService");

async function sendEmailNotifications() {
  const appointments = await AppointmentService.getAppointmentsToNotify();
  const promises = appointments.map((appointment) =>
    EmailService.sendNotificationMail(appointment)
  );
  await Promise.all(promises);
}

cron.schedule("* * * * *", sendEmailNotifications);
