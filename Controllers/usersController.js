const { uploadPicture } = require("../services/uploadFileServices");
const { updateAvatar } = require("../services/updateAvatarServices");
const { errorOrResponce } = require("../error");

const usersController = async (res, {req}, next) => {
  try {
      console.log(res.res);
    const { _id: id } = req.user;
    const avatarURL = await uploadPicture(id, req.file);
    if (!avatarURL) {
      res.status(401).json(
        errorOrResponce("401 Unauthorized", {
          message: "Not authorized",
        })
      );
      console.log(avatarURL);
      }
      
    await updateAvatar(id, { avatarURL });

    res.status(200).json(errorOrResponce("200 OK", { avatarURL }));
  } catch (error) {
    next(error);
  }
};

module.exports = {usersController};
