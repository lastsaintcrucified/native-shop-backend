const mongoose = require("mongoose");

const { Schema } = mongoose;

const catagorySchema = new Schema({
  name: { type: String, required: true },
  icon: { type: String },
  color: { type: String },
});

module.exports = mongoose.model("Catagory", catagorySchema);
