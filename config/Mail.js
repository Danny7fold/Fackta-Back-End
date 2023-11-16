// FOR MAILING

const nodemailer = require("nodemailer");
const { MAIL, MAIL_PASSWORD } = process.env;
const hbs = require('nodemailer-express-handlebars')
const path = require('path')


const sendEmail = async (options) => {
  let { from, to, subject, url,fullname} = options;
 

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      

      auth: {
        user: MAIL,
        pass: MAIL_PASSWORD,
      },
    });

    // point to the template folder
const handlebarOptions = {
  viewEngine: {
      partialsDir: path.resolve('./views/'),
      defaultLayout: false,
  },
  viewPath: path.resolve('./views/'),
};
transporter.use('compile', hbs(handlebarOptions))


    await transporter.sendMail({
      from,
      to,
      subject,
      template: "email",
      context: {                 
        username: fullname,
        url: url
      }
    });

    return true;
  } catch (error) {
    console.log(error, "email not sent");
  }
};

module.exports = sendEmail;
