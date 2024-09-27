const multer = require("multer");

let uploadedFileName;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './documents')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      uploadedFileName = uniqueSuffix + file.originalname 
      cb(null, uploadedFileName)
      recentUploadedFileName(uniqueSuffix + file.originalname);
    }
})

const recentUploadedFileName = () => {
    return uploadedFileName
}

module.exports = {storage, recentUploadedFileName};