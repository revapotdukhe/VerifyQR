const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_EMAIL,      // SMTP login
    pass: process.env.BREVO_SMTP_KEY,   // SMTP key
  },
});

const sendEmail = async (to, subject, html) => {
  await transporter.sendMail({
    from: "potdukhereva@gmail.com",     // Your verified sender email
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;