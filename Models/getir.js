const { json } = require("body-parser");
const mongoose = require("mongoose");

const GetirSchema = new mongoose.Schema({
  _id: {type: String},
  key: {type: String},
  createdAt: {type: Date},
  counts: {
    min: { type: Number, min: 0 },
    max: { type: Number, min: 0 }
  },
  value: {type: String}
}, { collection : 'records' });

const Getir = mongoose.model("Getir", GetirSchema);
module.exports = Getir;