const { recentUploadedFileName } = require("../middleware/middleware");
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const TradeDB = require("../modal/modal.trade");

////////  File Upload, Read and Store in DB will get performed by this function
const upload = async () => {
  try {
    // Getting the file name
    const thisFileName = recentUploadedFileName();

    if (!thisFileName) return false;

    // Reading of the File
    const response = await readTheFile(thisFileName);
    if (response) {
      // Deletion of the file after storing the data in DB
      const filePath = path.join(__dirname, `../../documents/${thisFileName}`);
      deleteFile(filePath);
      return response;
    }
  } catch (error) {
    throw error;
  }
};

// READING the file
const readTheFile = (filename) => {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, `../../documents/${filename}`);
    const results = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => results.push(row))
      .on("end", async () => {
        try {
          const result = await storingInDB(results);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      })
      .on("error", (error) => {
        throw error;
      });
  });
};

// Uploading the data in the DB
const storingInDB = async (data) => {
  let res;
  for (const item of data) {
    const [baseCoin, quoteCoin] = item["Market"].split("/");
    const response = await TradeDB.create({
      user_id: item["User_ID"],
      utc_time: item["UTC_Time"],
      operation: item["Operation"],
      base_coin: baseCoin,
      quote_coin: quoteCoin,
      amount: item["Buy/Sell Amount"],
      price: item["Price"],
    });

    if (!response) {
      return null;
    } else res = "File data is stored in database";
  }

  return res;
};

// Function to delete the file
const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Error deleting file: ${filePath}`, err);
    } else {
      console.log(`File deleted: ${filePath}`);
    }
  });
};

// Getting the Balance Function
const balance = async (time) => {
  try {
    const allTrades = await getAllTrades();
    if (allTrades) {
      const trades = allTrades.filter((item) => {
        if (new Date(item["utc_time"]) <= new Date(time)) return item;
      });

      const coinBalance = balanceCalculation(trades);

      return coinBalance;
    } else return false;
  } catch (error) {
    throw error;
  }
};

// Balance calculation Function
const balanceCalculation = (trades) => {
  const coinBalance = {};
  trades.forEach((item) => {
    const { base_coin, operation, amount } = item;
    if (!coinBalance[base_coin]) {
      coinBalance[base_coin] = 0;
    }

    if (operation === "Buy") {
      coinBalance[base_coin] += amount;
    } else if (operation === "Sell") {
      coinBalance[base_coin] -= amount;
    }
  });
  return coinBalance;
};

// Getting all trades from the DB
const getAllTrades = async () => {
  const res = await TradeDB.find();
  if (res.length !== 0) return res;
  else return null;
};

module.exports = {
  upload,
  balance,
};
