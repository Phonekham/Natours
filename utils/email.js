const nodemailer = require("nodemailer");
const pug = require("pug");
const htmlToText = require("html-to-text");

module.exports = class Email {
  // new Email(user,url).sendWelcome()
  constructor() {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `Phonekham <${process.env.EMAIL_FROM}>`;
  }
  newTransport() {
    if (process.env.NODE_ENV === "produc") {
      // sendgrid
      return 1;
    }
    return nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: "25",
      auth: {
        user: "fdfe5587b16ba4",
        pass: "e919d47cbcfed3"
      }
    });
  }
  // Send the actual email
  async send(template, subject) {
    // 1) render HTML based on a pug template
    const html = pug.renderFile(
      `${__dirname}/../views/emails/${template}.pug`,
      {
        firstName: this.firstName,
        url: this.url,
        subject
      }
    );

    // 2 Define the mail options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html)
      // html:
    };
    // 3 create a transport and send email
    this.newTransport().sendMail(mailOptions);
  }
  async sendWelcome() {
    await this.send("Welcome", "Welcome to natours family");
  }
};
