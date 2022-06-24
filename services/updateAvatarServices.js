const { User } = require("../models/usersModel");

const updateAvatar = async (id, data) => {
  return User.findByIdAndUpdate(id, data, { new: true });
};

module.exports = {
  updateAvatar,
};
