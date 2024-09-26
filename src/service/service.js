
const multer = require("multer");
const TradeDB = require("../modal/modal.trade");

const upload = async (data) => {
    console.log(data)
    return "NULL"
//   try{
//     const response = await PDF.create({ title: title, pdf: fileName});
//     return response;
//   }catch(error){
//     throw error
//   }
}

// const getFiles = async () =>{
//   try{
//     const files = await PDF.find();
//     return files;
//   }catch(error){
//     throw error
//   }
// }

module.exports = {
  upload
};
// , getFiles