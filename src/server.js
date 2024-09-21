require("./utils/send-email-notification-scheduler");
const app = require("./app");

app.listen(3333, () => {
  console.log("Server is up and running on http://localhost:3333");
});
