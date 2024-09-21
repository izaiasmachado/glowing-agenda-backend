const zod = require("./zod");
const dotenv = require("dotenv");

dotenv.config();

const environmentSchema = zod.object({
  AGENDAMENTOS_NODE_ENV: zod.string().default("development"),
  AGENDAMENTOS_JWT_SECRET: zod.string(),
  AGENDAMENTOS_SMTP_USER: zod.string(),
  AGENDAMENTOS_SMTP_PASSWORD: zod.string(),
  AGENDAMENTOS_MONGODB_URI: zod.string(),
  AGENDAMENTOS_MONGODB_DB_NAME: zod.string().default(`glowing-agenda`),
});

const environment = environmentSchema.parse(process.env);

module.exports = environment;
