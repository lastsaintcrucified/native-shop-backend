const httpError = require("../models/httpError");
const Product = require("../models/product");
const Catagory = require("../models/catagory");

const getProduct = async (req, res, next) => {
  let productList;
  try {
    productList = await Product.find();
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

const createProduct = async (req, res, next) => {
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

exports.getProduct = getProduct;
exports.createProduct = createProduct;
