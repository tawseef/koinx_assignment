/* eslint-disable no-undef */
const express = require("express");
const multer = require("multer");
const router = express.Router();
const { storage } = require("../middleware/middleware");

const { handleFileUpload, getBalance } = require("../controller/controller");

const upload = multer({ storage: storage })

// File Upload Route
router.post("/upload", upload.single("file"), handleFileUpload);

// Get Balance Route
router.post("/balance", getBalance)

module.exports = router