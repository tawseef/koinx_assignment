const { upload, balance } = require("../service/service");

// File Upload Function
const handleFileUpload = async (req, res) => {
  const response = await upload(req.body);
  if (response) res.status(200).json(response);
  else res.status(400).json({ msg: "error" });
};

// Get Balance Function
const getBalance = async (req, res) => {
  const { timestamp } = req.body;

  const response = await balance(timestamp);
  if (response) res.status(200).json(response);
  else res.status(400).json({ msg: "error" });
};

module.exports = { handleFileUpload, getBalance };
