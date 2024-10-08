const env = require("./environment");
const zod = require("./zod");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.AGENDAMENTOS_SMTP_USER,
    pass: env.AGENDAMENTOS_SMTP_PASSWORD,
  },
});

const sendMailSchema = zod.object({
  to: zod.string(),
  subject: zod.string(),
  text: zod.string(),
});

const buildAndValidateMailOptions = (options) => {
  return sendMailSchema.parse({
    ...options,
    from: env.AGENDAMENTOS_SMTP_USER,
  });
};

async function sendMail(options, callback) {
  const mailOptions = buildAndValidateMailOptions(options);
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) return reject(error);
      return resolve(info);
    });
  });
}

module.exports = { sendMail };
