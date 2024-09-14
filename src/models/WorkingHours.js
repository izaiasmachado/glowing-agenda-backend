const { Schema, model } = require("../lib/mongoose");

const WorkingHoursSchema = new Schema({
  //   businessId: {
  //     type: String,
  //     required: true,
  //   },
  //   owner: {
  //     type: Schema.Types.ObjectId,
  //     required: true,
  //   },
  workingHours: [
    {
      day: {
        type: Number,
        required: true,
      },
      from: {
        type: String,
        required: true,
      },
      to: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = model("WorkingHours", WorkingHoursSchema);
