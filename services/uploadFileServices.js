const Jimp = require("jimp");
const path = require("path");
const fs = require("fs").promises;

const pathToPublic = path.join(__dirname, "../Public");

const uploadPicture = async (id, file) => {
  const avatarURL = path.join("avatars", `${id}${file.originalname}`);

  Jimp.read(file.path)
    .then((picture) => {
      return picture.resize(250, 250).write(path.join(pathToPublic, avatarURL));
    })
    .catch((e) => console.log(e))
    .finally(await fs.unlink(file.path));
  return avatarURL;
};

module.exports = {
  uploadPicture,
};
