const mongoose = require("mongoose");
const Order = require("./Order");
const Vaccine = require("./Vaccine");
const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
    customerid: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    items: [
        {
            vaccine: {
                type: Schema.Types.ObjectId,
                ref: "Vaccine"
            },
            price: {
                type: Number
            },
            injectionTime: {
                type: Date,
            },
            isInject: {
                type: Boolean,
                default: false
            }
        }
    ],
    addressVNCVC: {
        type: String
    }
});


orderItemSchema.pre('remove', function (next) {
    var orderItem = this;
    let incTotal = 0;
    for (const key in orderItem.items) {
        if (Object.hasOwnProperty.call(orderItem.items, key)) {
            const element = orderItem.items[key];
            orderItem.model('Vaccine').update({ _id: element.vaccine }, { $inc: { order: 1 } }, { multi: true }, next)
            incTotal -= element.price
        }
    }
    orderItem.model('Order').update(
        { orderItem: { $in: orderItem._id } },
        { $pull: { orderItem: orderItem._id }, $inc: { totalBill: incTotal } },
        { multi: true },
        next);
});



const OrderItem = mongoose.model("OrderItem", orderItemSchema);

module.exports = OrderItem