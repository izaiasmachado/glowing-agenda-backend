const jwt = require("jsonwebtoken");
const environment = require("./environment");
const secret = environment.GUIAPERGUNTAS_JWT_SECRET;

const sign = async (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
};

const verify = async (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

module.exports = {
  sign,
  verify,
};
