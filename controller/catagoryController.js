const httpError = require("../models/httpError");
const Catagory = require("../models/catagory");

const getCatagory = async (req,res,next) =>{
    let catagoryList;
    try{
        catagoryList = await Catagory.find();
    }catch(err){
        const error = new httpError("Something went wrong!",500);
        return next(error);
    }
    if(!catagoryList){
        const error = new httpError("No catagory found!",404);
        return next(error);
    }
    res.status(200).json({catagoryList:catagoryList});
}

const createCatagory = async (req,res,next) => {
    const {name,icon,color} = req.body;
    const createdCatagory = new Catagory({
        name,
        icon,
        color
    });
    try{
        await createdCatagory.save();
    }catch(err){
        const error = new httpError("Catagory cannot be created!",500);
        return next(error);
    }
    res.status(201).json({catagory:createdCatagory});
}

exports.getCatagory = getCatagory;
exports.createCatagory = createCatagory;
