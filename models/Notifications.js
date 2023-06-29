const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  footer: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

const notifications = mongoose.model("notifications", notificationSchema);

module.exports = notifications;
