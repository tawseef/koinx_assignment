const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  user_id: { type: Number, required: true },
  utc_time: { type: Date, required: true },
  operation: { type: String, required: true, enum: ['Buy', 'Sell'] },
  base_coin: { type: String, required: true },
  quote_coin: { type: String, required: true },
  amount: { type: Number, required: true },
  price: { type: Number, required: true }
});

const TradeDB = mongoose.model('Trade', tradeSchema);

module.exports = TradeDB;
