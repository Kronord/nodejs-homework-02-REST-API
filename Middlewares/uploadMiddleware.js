const multer = require("multer");
const { createError } = require("../error");
const path = require("path");

const pathToTmp = path.join(__dirname, "../tmp");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, pathToTmp);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function fileFilter(req, file, cb) {
    if (file.mimetype.includes("image")) {
      cb(null, true);
    } else {
      cb(createError(400, "Wrong format"));
    }
  },
});

module.exports = upload;
