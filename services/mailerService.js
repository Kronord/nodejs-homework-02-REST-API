const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const { User } = require("../models/usersModel");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = (subject, text) => { 
  const msg = {
    to: "fedishyn2@gmail.com",
    from: "fedishyn1999@gmail.com",
    subject,
    text,
    html: `<strong>${text}</strong>`,
  };
  console.log(msg);
  
  return msg;
};

const mailService = async (verificationToken) => { 
  const user = await User.findOneAndUpdate({ verificationToken }, {
    verificationToken: null,
    verify: true
  }, {new: true});

  return user;
};

const resendingMailService = async (email) => { 
  const user = await User.findOne({ email });
  return user;
};

module.exports = { sgMail, sendMail, mailService, resendingMailService};