require("./utils/send-email-notification-scheduler");
const app = require("./app");

app.listen(5000, () => {
  console.log("Server is up and running on http://localhost:3000");
});
