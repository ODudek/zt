const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DevicesSchema = new Schema({
  model: String,
  system: String,
  holder: String
});

module.exports = mongoose.model("Device", DevicesSchema);
