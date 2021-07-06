const httpError = require("../models/httpError");
const Product = require("../models/product");

const getProduct = async (req,res,next) =>{
    let productList;
    try{
        productList = await Product.find();
        
    }catch(err){
        const error = new httpError("Something Went Wrong!",500);
        return next(error);
    }

    if(!productList){
        const error = new httpError("No products found!",404);
        return next(error);
    }
    res.send(productList)
}

const createProduct = async (req,res,next) => {
    const {name,image,countInStock} = req.body;
    const createdProduct = new Product ({
        name,
        image,
        countInStock
    })
    try{
        await createdProduct.save();
    }catch(err){
        const error = new httpError("Product cannot be created!",500);
        return next(error);
    }
    res.status(201).json({productId:createdProduct.id,productName:createdProduct.name,countInStock:createdProduct.countInStock})
}

exports.getProduct = getProduct;
exports.createProduct = createProduct;
