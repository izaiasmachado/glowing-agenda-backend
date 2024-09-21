const express = require("express");
const router = express.Router();

const CalendarController = require("../controllers/CalendarController");
const CalendarMiddleware = require("../middlewares/CalendarMiddleware");

router.get(
  "/week",
  CalendarMiddleware.ensureValidDate,
  CalendarController.week
);
router.get(
  "/month",
  CalendarMiddleware.ensureValidDate,
  CalendarController.month
);

module.exports = router;
