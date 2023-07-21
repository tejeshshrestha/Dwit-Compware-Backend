const mongoose = require("mongoose");

const MailSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: [String],
    required: true,
  },
});

const mail = mongoose.model("mail", MailSchema);

module.exports = mail;
