const mongoose = require("mongoose");

const { Schema } = mongoose;

const orderItemSchema = new Schema({
  quantity:{
      type:Number,
      required:true
  },
  product:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Product",
  }
});

orderItemSchema.set("toJSON", {
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  },
});

module.exports = mongoose.model("OrderItem", orderItemSchema);
