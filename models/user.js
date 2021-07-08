const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
    
})
userSchema.set("toJSON", {
    versionKey: false,
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    },
  });
module.exports = mongoose.model("User",userSchema);