const ExpressException = require("../exceptions/ExpressException");

const errorHandler = (err, req, res, next) => {
  if (err instanceof ExpressException) {
    const { message, status } = err;
    return res.status(status).send({
      error: {
        message,
      },
    });
  }

  console.error(err);
  return res
    .status(500)
    .send({ errors: [{ message: "Something went wrong" }] });
};

module.exports = errorHandler;
