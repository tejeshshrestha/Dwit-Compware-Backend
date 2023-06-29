const { validationResult } = require("express-validator");
const dotenv = require("dotenv");
const transporter = require("../config/emailConfig");
dotenv.config();
class emailController {
  static post = (req, res) => {
    const { receiverEmail, subject, bodyMessage } = req.body;
    console.log(bodyMessage);
    try {
      let info = transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: receiverEmail,
        subject: subject,
        html: bodyMessage,
      });
      res.json({
        success: true,
        message: "Email Sent!",
      });
    } catch (err) {
      res.json({
        success: false,
        message: "Unable to send email",
      });
    }
  };
}

module.exports = emailController;
