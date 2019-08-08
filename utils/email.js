const nodemailer = require("nodemailer");

const sendEmail = async options => {
  // 1 Create a transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: "25",
    auth: {
      user: "fdfe5587b16ba4",
      pass: "e919d47cbcfed3"
    }
  });

  // 2 Define the mail options
  const mailOptions = {
    from: "Phonekham <phone.madridista@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message
    // html:
  };

  // 3 Actually send the email
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
  });
};

module.exports = sendEmail;
