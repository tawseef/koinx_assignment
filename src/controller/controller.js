const httpStatus = require("http-status");
const { upload, balance } = require("../service/service");


// File Upload Function
const handleFileUpload = async (req, res) => {
  const response = await upload(req.body);
  if (response) res.status(httpStatus.OK).json(response);
  else res.status(httpStatus.BAD_REQUEST).json({ msg: "Internal server error" });
};

// Get Balance Function
const getBalance = async (req, res) => {
  const { timestamp } = req.body;

  const response = await balance(timestamp);
  if (response) res.status(httpStatus.OK).json(response);
  else res.status(httpStatus.BAD_REQUEST).json({ msg: "Internal server error" });
};

module.exports = { handleFileUpload, getBalance };
