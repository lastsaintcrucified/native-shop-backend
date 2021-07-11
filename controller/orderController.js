const httpError = require("../models/httpError");
const Order = require("../models/order");
const mongoose = require("mongoose");
const OrderItem = require("../models/orderItem");

const getOrder = async (req, res, next) => {
  let orderList;
  try {
    orderList = await Order.find().populate("user").sort({ dateOrdered: -1 });
  } catch (err) {
    const error = new httpError("Something went wrong!", 500);
    return next(error);
  }
  if (!orderList) {
    const error = new httpError("No order found!", 404);
    return next(error);
  }
  res.status(200).json({ orderList });
};

const getOrderById = async (req, res, next) => {
  const orderId = req.params.id;
  if (!mongoose.isValidObjectId(orderId)) {
    const error = new httpError("Invalid ID!", 404);
    return next(error);
  }
  let order;
  try {
    order = await Order.findById(orderId)
      .populate("user", "name")
      .populate({
        path: "orderItems",
        populate: { path: "product", populate: "catagory" },
      });
  } catch (err) {
    const error = new httpError("Something went wrong!", 500);
    return next(error);
  }
  if (!order) {
    const error = new httpError("No order found!", 404);
    return next(error);
  }
  res.status(200).json({ order });
};

const createOrder = async (req, res, next) => {
  const orderItemIds = await Promise.all(
    req.body.orderItems.map(async (orderItem) => {
      let newOrderItem = new OrderItem({
        quantity: orderItem.quantity,
        product: orderItem.product,
      });

      newOrderItem = await newOrderItem.save();

      return newOrderItem._id;
    })
  );
  const orderItemIdsResolved = await orderItemIds;

  const totalPrices = await Promise.all(
    orderItemIdsResolved.map(async (orderItemId) => {
      const orderItem = await OrderItem.findById(orderItemId).populate(
        "product",
        "price"
      );
      const totalPrice = orderItem.product.price * orderItem.quantity;
      return totalPrice;
    })
  );

  const totalPrice = totalPrices.reduce((a, b) => a + b, 0);
  const { shippingAddress1, shippingAddress2, city, zip, phone, status, user } =
    req.body;
  const createdOrder = new Order({
    orderItems: orderItemIdsResolved,
    shippingAddress1,
    shippingAddress2,
    city,
    zip,
    phone,
    status,
    totalPrice,
    user,
  });
  try {
    await createdOrder.save();
  } catch (err) {
    const error = new httpError("Order cannot be created!", 500);
    return next(error);
  }
  res.status(201).json({ order: createdOrder });
};

const updateOrder = async (req, res, next) => {
  const orderId = req.params.id;
  if (!mongoose.isValidObjectId(orderId)) {
    const error = new httpError("Invalid ID!", 404);
    return next(error);
  }
  const { status } = req.body;
  const updatedOrder = {
    status,
  };
  let order;
  try {
    order = await Order.findByIdAndUpdate(orderId, updatedOrder, { new: true });
  } catch (err) {
    const error = new httpError("Something went wrong!", 500);
    return next(error);
  }
  res.status(200).json({ order });
};

const deleteOrder = async (req, res, next) => {
  const orderId = req.params.id;
  if (!mongoose.isValidObjectId(orderId)) {
    const error = new httpError("Invalid ID!", 404);
    return next(error);
  }

  try {
    Order.findByIdAndRemove(orderId).then(async (order) => {
      if (order) {
        try {
          await order.orderItems.map(async (orderItem) => {
            await OrderItem.findByIdAndRemove(orderItem);
          });
          return res.status(200).json({ message: "Order deleted!" });
        } catch (err) {
          const error = new httpError("Something went wrong!", 500);
          return next(error);
        }
      } else {
        const error = new httpError("Could not find order with given ID!", 404);
        return next(error);
      }
    });
  } catch (err) {
    const error = new httpError("Something went wrong!", 500);
    return next(error);
  }
};

const getTotalSale = async (req, res, next) => {
  const totalSale = await Order.aggregate([
    { $group: { _id: null, totalSales: { $sum: "$totalPrice" } } },
  ]);
  if(!totalSale){
    const error = new httpError("The order sale cannot be aggregated!", 404);
    return next(error);
  }
  console.log(totalSale)
  res.status(200).json({totalSales:totalSale.pop().totalSales});
};

exports.getOrder = getOrder;
exports.createOrder = createOrder;
exports.getOrderById = getOrderById;
exports.updateOrder = updateOrder;
exports.deleteOrder = deleteOrder;
exports.getTotalSale = getTotalSale;
