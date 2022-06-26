const { User } = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");

const registration = async ({ email, password }) => {
  const doubleEmail = await User.findOne({ email });
  if (doubleEmail) {
    return null;
  }
  const user = new User({
    email,
    password,
    avatarURL: gravatar.url(email, {}, true),
  });
  await user.save();
  return {
    email: user.email,
    subscription: user.subscription,
    avatarURL: user.avatarURL,
  };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return null;
  }

  const payload = {
    _id: user._id,
    email: user.email,
  };

  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  return token;
};

const logout = async (id) => {
  await User.findByIdAndUpdate(id, { token: null });
};

const updateSubscription = async (id, body) =>
  await User.findByIdAndUpdate(id, body, { new: true });

const authenticateUser = async (token) => {
  try {
    const payload = jwt.verify(token, process.env.SECRET);
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
