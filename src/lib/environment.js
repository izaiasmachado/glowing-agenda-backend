const zod = require("./zod");
const dotenv = require("dotenv");

dotenv.config();

const environmentSchema = zod.object({
  AGENDAMENTOS_NODE_ENV: zod.string().default("development"),
  AGENDAMENTOS_SMTP_USER: zod.string(),
  AGENDAMENTOS_SMTP_PASSWORD: zod.string(),
});

const environment = environmentSchema.parse(process.env);

module.exports = environment;
