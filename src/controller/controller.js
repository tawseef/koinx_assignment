const { upload } = require("../service/service")
// , getFiles
const handleFileUpload = async (req,res) => {
    
  const response = await upload(req.body);
  if(response) res.status(200).json(response);
  else res.status(400);
}

// const handleGetFiles = async (req,res) => {
//   const response = await getFiles();
//   if(response) res.status(200).json(response);
//   else res.status(400);
// }
// , handleGetFiles
module.exports = { handleFileUpload };