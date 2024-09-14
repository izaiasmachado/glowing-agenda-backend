const zod = require("./zod");
const dotenv = require("dotenv");

dotenv.config();

const environmentSchema = zod.object({
  AGENDAMENTOS_NODE_ENV: zod.string().default("development"),
  // AGENDAMENTOS_JWT_SECRET: zod.string(),
});

const environment = environmentSchema.parse(process.env);

module.exports = environment;
