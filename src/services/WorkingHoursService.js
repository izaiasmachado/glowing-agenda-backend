const moment = require("moment");

const workingHours = [
  {
    day: 1,
    from: "08:00",
    to: "18:00",
  },
  {
    day: 2,
    from: "08:00",
    to: "18:00",
  },
  {
    day: 3,
    from: "08:00",
    to: "18:00",
  },
  {
    day: 4,
    from: "08:00",
    to: "18:00",
  },
  {
    day: 5,
    from: "08:00",
    to: "18:00",
  },
  {
    day: 6,
    from: "08:00",
    to: "14:00",
  },
];

async function getWorkingHours() {
  return workingHours;
}

module.exports = {
  getWorkingHours,
};
