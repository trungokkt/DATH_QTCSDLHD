
const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
//const crypto = require("crypto");
//const Token = require("../models/Token");
//const sendEmail = require("../middleware/email");
//var config = require('../db/config');
const Vaccine = require("../models/Vaccine");
module.exports = {
    createOrder: async function (req, res, next) {
        // Create a new user
        try {
            const order = await Order.createOrder(req.userId, req.token)
            res.send(order)
        } catch (error) {
            console.log(error)

            res.status(400).send(error);
        }
    },
    deleteOrder: async function (req, res, next) {
        //Login a registered user
        try {

        } catch (error) {
            res.status(401).send(error);
        }
    },
    updateOrder: async function (req, res, next) {

    },
    orderByAccount: async function (req, res, next) {
        try {
            console.log(req.userId)

            const orders = await Order.find({ "username": req.userId }).sort({ createDate: -1 }).populate({
                path: 'orderItem',
                populate: {
                    path: 'items.vaccine'
                }
            })
            res.send(orders)
        } catch (error) {
            console.log(error)
            res.status(401).send(error);
        }
    },
    findOrder: async function (req, res, next) {
        try {
            if (req.body.phone || req.query.phone) {
                next();
            }
            console.log(req.token)
            const orders = await Order.find().sort({ createDate: -1 }).populate({
                path: 'orderItem',
                populate: {
                    path: 'items.vaccine',
                    select: 'name'
                }
            })
            res.send(orders)
        } catch (error) {
            res.status(401).send(error);
        }
    },
    findOrderbyPhone: async function (req, res, next) {
        // Log user out of the application
        try {
            const orders = await Order.find({ "phone": req.body.phone || req.query.phone })
        } catch (error) {
            res.status(401).send(error);
        }
    },
    deleteOrderItem: function (req, res, next) {
        //Login a registered user
        try {
            OrderItem.findById(req.body._id).then((doc) => {
                doc.remove().then(() => {
                    res.send(doc)
                })
            })

        } catch (error) {
            res.status(401).send(error);
        }
    },
    deleteProductInOrderItem: async function (req, res, next) {
        try {
            const { orderItemId, vaccineId } = req.body;
            const order = await Order.findOne({ orderItem: { $in: orderItemId } })
            console.log(order)

            const orderItem = await OrderItem.findById(orderItemId)

            orderItem.items.splice(orderItem.items.findIndex((e) => e.vaccine == vaccineId), 1)
            const vaccine = await Vaccine.findById(vaccineId)
            vaccine.order++;

            order.totalBill -= vaccine.price
            await vaccine.save()
            await order.save()
            await orderItem.save();
            res.send(orderItem)
        } catch (error) {
            res.status(401).send(error);
        }
    },
    setInjectTime: async function (req, res, next) {
        try {
            const { orderItemId, vaccineId ,inJectTime } = req.body;
            console.log(req.body)

            const orderItem = await OrderItem.findById(orderItemId)

            const index = orderItem.items.findIndex((e) => e.vaccine == vaccineId)
           

            orderItem.items[index].injectionTime = inJectTime
            await orderItem.save();
            
            res.send(orderItem)
        } catch (error) {
            res.status(401).send(error);
        }
    }
}