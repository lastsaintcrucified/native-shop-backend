const mongoose = require("mongoose");

const { Schema } = mongoose;

const orderSchema = new Schema({
    orderItems:[{
        type:mongoose.Types.ObjectId,
        ref:"OrderItem",
        required:true
    }],
    shippingAddress1: {
        type:String,
        required:true
    },
    shippingAddress1: {
        type:String,
      
    },
    city:{
        type:String,
        required:true
    },
    zip:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:"Pending"
    },
    totalPrice:{
        type:Number
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    dateOrdered:{
        type:Date,
        default:Date.now
    }
})
orderSchema.set("toJSON", {
    versionKey: false,
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    },
  });
module.exports = mongoose.model("Order",orderSchema);