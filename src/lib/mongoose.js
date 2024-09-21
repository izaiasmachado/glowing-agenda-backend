const mongoose = require("mongoose");
const {
  AGENDAMENTOS_MONGODB_URI,
  AGENDAMENTOS_MONGODB_DB_NAME,
} = require("./environment");

mongoose
  .connect(AGENDAMENTOS_MONGODB_URI, {
    dbName: AGENDAMENTOS_MONGODB_DB_NAME,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to mongo", err));

module.exports = mongoose;
