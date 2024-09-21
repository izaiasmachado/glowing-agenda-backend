require("express-async-errors");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const errorHandler = require("./middlewares/errors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(routes);
app.use(errorHandler);

module.exports = app;
