const { User } = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { nanoid } = require("nanoid");
// const { sgMail, sendMail } = require('../services/mailerService');


const registration = async ({ email, password, name }) => {
  const doubleEmail = await User.findOne({ email });
  if (doubleEmail) {
    return null;
  }

  const user = new User({
    name,
    email,
    password,
    verificationToken: nanoid(16),
  });
  await user.save();

  const userId = await User.findOne({ email });
  const { _id } = userId;

  const payload = {
    _id,
    email,
    name,
  };

  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });
  await User.findByIdAndUpdate(_id, { token });
  // sgMail
  //   .send(
  //     sendMail(
  //       "Please Verify Your Email",
  //       `To verify your email, please follow the link below http://localhost:3020/api/users//verify/${user.verificationToken}`
  //     )
  //   )
  //   .then(() => {
  //     console.log("Verify email sent");
  //   })
  //   .catch((error) => {
  //     console.error(error.body);
  //   });
  return {payload, token};
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return null;
  }

  // if (user.verify === false) {
  //   return 'notVerify'
  // };

  const payload = {
    _id: user._id,
    email: user.email,
    name: user.name,
  };

  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  return { token, payload };
};

const logout = async (id) => {
  await User.findByIdAndUpdate(id, { token: null });
};

const updateSubscription = async (id, body) =>
  await User.findByIdAndUpdate(id, body, { new: true });

const authenticateUser = async (token) => {
  try {
    console.log(token);
    const payload = jwt.verify(token, process.env.SECRET);
    console.log(payload);
    
    const { _id } = payload;
    const user = await User.findById(_id);

    return user.token !== token ? null : user;
  } catch (e) {
    return null;
  }
};

module.exports = {
  registration,
  login,
  authenticateUser,
  logout,
  updateSubscription,
};
