const { unauthorizedError, errorOrResponce } = require("../error");
const {
  mailService,
  resendingMailService,
} = require("../services/mailerService");
const { sgMail, sendMail } = require("../services/mailerService");

const mailController = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const request = await mailService(verificationToken);
    if (!request) {
      return res.status(404).json(
        unauthorizedError("404 Not Found", {
          message: "User not found",
        })
      );
    }
    res.status(200).json(
      unauthorizedError("200 OK", {
        message: "Verification successful",
      })
    );
    sgMail
      .send(
        sendMail(
          "Successfully register",
          "Congratulations, you have successfully registered!"
        )
      )
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    next(error);
  }
};

const resendingMailController = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await resendingMailService(email);
    if (!user) {
      return res.status(404).json(
        unauthorizedError("404 Not Found", {
          message: "User not found",
        })
      );
    }
    if (user.verify === true) {
      return res.status(404).json(
        unauthorizedError("400 Bad Request", {
          message: "Verification has already been passed",
        })
      );
    }
    res.status(200).json(
      errorOrResponce("200 Ok", {
        message: "Verification email sent",
      })
    );

    sgMail.send(
      sendMail(
        "Please Verify Your Email",
        `To verify your email, please follow the link below http://localhost:3000/api/users//verify/${user.verificationToken}`
      )
    );
  } catch (error) {
    next(error);
  }
};

module.exports = { mailController, resendingMailController };
