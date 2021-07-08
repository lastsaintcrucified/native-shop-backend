const httpError = require("../models/httpError");
const Catagory = require("../models/catagory");
const mongoose = require("mongoose");

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
    res.status(200).json({catagoryList});
}

const getCatagoryById = async(req,res,next) =>{
    const catId = req.params.id;
    if(!mongoose.isValidObjectId(catId)){
        const error = new httpError("Invalid ID!", 404);
      return next(error);
    }
    let catagory;
    try{
        catagory = await Catagory.findById(catId);
        
    }catch(err){
        const error = new httpError("Something went wrong!",500);
        return next(error);
    }
    if(!catagory){
        const error = new httpError("No catagory found!",404);
    return next(error);
    }
    res.status(200).json({catagory});
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

const updateCatagory = async (req,res,next) =>{
    const catId = req.params.id;
    if(!mongoose.isValidObjectId(catId)){
        const error = new httpError("Invalid ID!", 404);
      return next(error);
    }
    const {name,icon,color} = req.body;
    const updatedCatagory = {
        name,
        icon,
        color
    }
    let catagory;
    try{
        catagory = await Catagory.findByIdAndUpdate(catId,updatedCatagory,{new:true});
    }catch(err){
        const error = new httpError("Something went wrong!",500);
        return next(error);
    }
    res.status(200).json({catagory});
}

const deleteCatagory = async (req,res,next) =>{
    const catId = req.params.id;
    if(!mongoose.isValidObjectId(catId)){
        const error = new httpError("Invalid ID!", 404);
      return next(error);
    }
    let deletedCatagory;
    try{
        deletedCatagory = await Catagory.findByIdAndRemove(catId);
        if(!deletedCatagory){
            const error = new httpError("Could not find catagory with given ID!",404);
            return next(error); 
        }
    }catch(err){
        const error = new httpError("Something went wrong!",500);
        return next(error);
    }

    res.status(200).json({message:"Catagory deleted!"});
}



exports.getCatagory = getCatagory;
exports.createCatagory = createCatagory;
exports.deleteCatagory = deleteCatagory;
exports.getCatagoryById = getCatagoryById;
exports.updateCatagory = updateCatagory;

