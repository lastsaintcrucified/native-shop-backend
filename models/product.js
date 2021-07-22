const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  richDescription: { type: String, default: "" },
  image: { type: String, default: "" },
  images: [{ type: String }],
  countInStock: { type: Number, required: true, min: 0, max: 600 },
  brand: { type: String, default: "" },
  price: { type: Number, default: 0 },
  catagory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Catagory",
    required: true,
  },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  dateCreated: { type: Date, default: Date.now },
});

productSchema.set("toJSON", {
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  },
});

module.exports = mongoose.model("Product", productSchema);
