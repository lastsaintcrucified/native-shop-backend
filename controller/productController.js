const httpError = require("../models/httpError");
const Product = require("../models/product");
const Catagory = require("../models/catagory");
const mongoose = require("mongoose");

const getProduct = async (req, res, next) => {
    let filter = {};
    const query = req.query.catagories;
    if(query){
        filter = {catagory:query.split(",")};
    }
  let productList;
  try {
    productList = await Product.find(filter).populate("catagory");
  } catch (err) {
    const error = new httpError("Something Went Wrong!", 500);
    return next(error);
  }

  if (!productList) {
    const error = new httpError("No products found!", 404);
    return next(error);
  }
  res.send(productList);
};

const getProductById = async (req, res, next) => {
  const productId = req.params.id;
  if (!mongoose.isValidObjectId(productId)) {
    const error = new httpError("Invalid ID!", 404);
    return next(error);
  }
  let product;
  try {
    product = await Product.findById(productId).populate("catagory");
  } catch (err) {
    const error = new httpError("Something Went Wrong!", 500);
    return next(error);
  }
  if (!product) {
    const error = new httpError("No products found!", 404);
    return next(error);
  }
  res.status(200).json({ product });
};

const createProduct = async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.body.catagory)) {
    const error = new httpError("Invalid ID!", 404);
    return next(error);
  }
  try {
    const catagoryReq = await Catagory.findById(req.body.catagory);
    if (!catagoryReq) {
      const error = new httpError("No catagory found!", 404);
      return next(error);
    }
  } catch (err) {
    const error = new httpError("Something Went Wrong!", 500);
    return next(error);
  }
  const {
    name,
    description,
    richDescription,
    brand,
    price,
    image,
    countInStock,
    isFeatured,
    numReviews,
    rating,
    catagory,
  } = req.body;
  const createdProduct = new Product({
    name,
    description,
    richDescription,
    brand,
    price,
    image,
    countInStock,
    isFeatured,
    numReviews,
    rating,
    catagory,
  });
  let product;
  try {
    product = await createdProduct.save();
  } catch (err) {
    const error = new httpError("Product cannot be created!", 500);
    return next(error);
  }

  res.status(201).json({ product });
};

const updateProduct = async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.body.catagory)) {
    const error = new httpError("Invalid ID!", 404);
    return next(error);
  }
  try {
    const catagoryReq = await Catagory.findById(req.body.catagory);
    if (!catagoryReq) {
      const error = new httpError("No catagory found!", 404);
      return next(error);
    }
  } catch (err) {
    const error = new httpError("Something Went Wrong!", 500);
    return next(error);
  }
  let product;
  const productId = req.params.id;
  const {
    name,
    description,
    richDescription,
    brand,
    price,
    image,
    countInStock,
    isFeatured,
    numReviews,
    rating,
    catagory,
  } = req.body;
  const updatedProduct = {
    name,
    description,
    richDescription,
    brand,
    price,
    image,
    countInStock,
    isFeatured,
    numReviews,
    rating,
    catagory,
  };
  try {
    product = await Product.findByIdAndUpdate(productId, updatedProduct, {
      new: true,
    });
  } catch (err) {
    const error = new httpError("Something Went Wrong!", 500);
    return next(error);
  }

  if (!product) {
    const error = new httpError("No product found!", 404);
    return next(error);
  }

  res.status(200).json({ product });
};

const deleteProduct = async (req, res, next) => {
  const productId = req.params.id;
  if (!mongoose.isValidObjectId(productId)) {
    const error = new httpError("Invalid ID!", 404);
    return next(error);
  }
  try {
    await Product.findByIdAndRemove(productId);
  } catch (err) {
    const error = new httpError("Something Went Wrong!", 500);
    return next(error);
  }
  res.status(200).json({ message: "Deleted successfully!!" });
};

const getCount = async (req, res, next) => {
  let countProduct;
  try {
    countProduct = await Product.countDocuments((count) => count);
  } catch (err) {
    const error = new httpError("Something went wrong!", 500);
    return next(error);
  }
  if (!countProduct) {
    const error = new httpError("No product!", 404);
    return next(error);
  }
  res.send({ count: countProduct });
};

const getFeatured = async (req, res, next) => {
  const count = req.params.count ? req.params.count : 0;
  let products;
  try {
    products = await Product.find({ isFeatured: true }).limit(+count);
  } catch (err) {
    const error = new httpError("Something went wrong!", 500);
    return next(error);
  }
  if (!products) {
    const error = new httpError("Could not found featured products!", 404);
    return next(error);
  }
  res.status(200).json({ products });
};

exports.getProduct = getProduct;
exports.createProduct = createProduct;
exports.getProductById = getProductById;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
exports.getCount = getCount;
exports.getFeatured = getFeatured;
