const httpError = require("../models/httpError");
const User = require("../models/user");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const getUser = async (req, res, next) => {
  let userList;
  try {
    userList = await User.find().select("-passwordHash");
  } catch (err) {
    const error = new httpError("Something went wrong!", 500);
    return next(error);
  }
  if (!userList) {
    const error = new httpError("No user found!", 404);
    return next(error);
  }
  res.status(200).json({ userList });
};

const getUserById = async (req, res, next) => {
  const userId = req.params.id;
  if (!mongoose.isValidObjectId(userId)) {
    const error = new httpError("Invalid ID!", 400);
    return next(error);
  }
  let user;
  try {
    user = await User.findById(userId).select("-passwordHash");
  } catch (err) {
    const error = new httpError("Something went wrong!", 500);
    return next(error);
  }
  if (!user) {
    const error = new httpError("No user found!", 404);
    return next(error);
  }
  res.status(200).json({ user });
};

const createUser = async (req, res, next) => {
  const {
    name,
    email,
    password,
    phone,
    isAdmin,
    street,
    apartment,
    zip,
    city,
    country,
  } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new httpError("Something went wrong!", 500);
    return next(error);
  }
  if (existingUser) {
    const error = new httpError("User already exists!!", 422);
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    passwordHash: bcrypt.hashSync(password, 13),
    phone,
    isAdmin,
    street,
    apartment,
    zip,
    city,
    country,
  });
  try {
    await createdUser.save();
  } catch (err) {
    const error = new httpError("User cannot be created!", 500);
    return next(error);
  }
  res.status(201).json({ user: createdUser });
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const secret = process.env.SECRET;
  let user;
  try {
    user = await User.findOne({ email: email });
  } catch (err) {
    const error = new httpError("Something went wrong!", 500);
    return next(error);
  }
  if (!user) {
    const error = new httpError("User not found!", 404);
    return next(error);
  }
  if (user && bcrypt.compareSync(password, user.passwordHash)) {
    const token = jwt.sign(
      {
        userId: user.id,
        isAdmin:user.isAdmin
      },
      secret,
      {
        expiresIn: "1d",
      }
    );
    res.status(200).json({ userId: user.id, email: user.email, token: token });
  } else {
    const error = new httpError(
      "Could not log you in,please check you credentials!",
      404
    );
    return next(error);
  }
};


const getCount = async (req, res, next) => {
    let countUser;
    try {
        countUser = await User.countDocuments((count) => count);
    } catch (err) {
      const error = new httpError("Something went wrong!", 500);
      return next(error);
    }
    if (!countUser) {
      const error = new httpError("No user!", 404);
      return next(error);
    }
    res.send({ count: countUser });
  };
  
  const deleteUser = async (req, res, next) => {
    const userId = req.params.id;
    if (!mongoose.isValidObjectId(userId)) {
      const error = new httpError("Invalid ID!", 404);
      return next(error);
    }
    try {
      await User.findByIdAndRemove(userId);
    } catch (err) {
      const error = new httpError("Something Went Wrong!", 500);
      return next(error);
    }
    res.status(200).json({ message: "Deleted successfully!!" });
  };

exports.getUser = getUser;
exports.getUserById = getUserById;
exports.createUser = createUser;
exports.loginUser = loginUser;
exports.getCount = getCount;
exports.deleteUser = deleteUser;