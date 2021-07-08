const mongoose = require("mongoose");

const { Schema } = mongoose;

const catagorySchema = new Schema({
  name: { type: String, required: true },
  icon: { type: String },
  color: { type: String },
});

catagorySchema.set("toJSON", {
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  },
});

module.exports = mongoose.model("Catagory", catagorySchema);
