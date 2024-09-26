/* eslint-disable no-undef */
const express = require("express");
const multer = require("multer");
const router = express.Router();

const { handleFileUpload, handleGetFiles } = require("../controller/controller");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null,  uniqueSuffix + file.originalname)
    }
})

const upload = multer({ storage: storage })

router.post("/upload-files", upload.single("file"), handleFileUpload);
// router.get("/getfiles", handleGetFiles);

module.exports = router;