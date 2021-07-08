const mongoose = require("mongoose");

const { Schema } = mongoose;

const orderSchema = new Schema({
    
})
orderSchema.virtual("id").get(()=>this._id.toHexString());
orderSchema.set("toJSON",{
    virtuals:true
});
module.exports = mongoose.model("Order",orderSchema);