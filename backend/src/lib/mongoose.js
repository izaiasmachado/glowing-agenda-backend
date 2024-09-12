const mongoose = require("mongoose");

mongoose
  .connect("mongodb://root:root@0.0.0.0:27017", {
    dbName: "test",
  })
  .then(() => console.log("Connected!!"))
  .catch((err) => console.error("Error connecting to mongo", err));

module.exports = mongoose;
