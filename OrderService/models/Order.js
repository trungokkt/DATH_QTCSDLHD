const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OrderItem = require("./OrderItem")
const Vaccine = require("./Vaccine")

const axios = require("axios")
const orderSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    totalBill: {
        type: Number,
    },
    isPayment: {
        type: Boolean,
        default: false
    },
    methodPayment: {
        type: String,
        default: "Tiền mặt"
    },
    orderItem: [
        { type: Schema.Types.ObjectId, ref: 'OrderItem' }
    ],
    status: {
        type: String,
        default: "Chờ xác nhận"
    },
    createDate: {
        type: Date,
        default: Date.now()
    },
});



orderSchema.statics.createOrder = async (username, token) => {
    const Authorization = "Bearer " + token
    const getCart = await axios({
        url: `http://localhost:3004/cart`,
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": Authorization
        }
    })
    const cart = getCart.data.basketItems

    const getUser = await axios({
        url: `http://localhost:3003/customer/me`,
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": Authorization
        }
    })
    const user = getUser.data

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        if (!cart) {
            throw new Error
        }
        var totalBill = 0
        var orderItemIds = []
        for (const [key, value] of Object.entries(cart)) {
            // create Customer
            const cartItem = JSON.parse(value)
            const data = {
                customerid: key,
                address: cartItem.address,
                fullname: cartItem.name,
                email: cartItem.email,
                gender: cartItem.gender,
                phone: cartItem.phone,
                relationship: cartItem.relations,
                bod: cartItem.dob
            }
            //create customer 
            const result = await axios({
                method: 'post',
                url: 'http://localhost:3003/customer/create',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": Authorization
                },
                data: data
            })
            if (!result) {
                throw new Error()
            }
            //add orderiten
            var vaccines = []
            for (const key in cartItem.vaccines) {
                if (Object.hasOwnProperty.call(cartItem.vaccines, key)) {
                    const element = cartItem.vaccines[key];
                    const vaccine = await Vaccine.findById(element)
                    totalBill += vaccine.price
                    vaccine.order--
                    await vaccine.save();

                    vaccines.push({ vaccine: element, price: vaccine.price })
                }
            }

            const orderItem = new OrderItem({
                customerid: key,
                name: cartItem.name,
                phone: cartItem.phone,
                items: vaccines,
                addressVNCVC: cartItem.VNCC_adresss
            })
            await orderItem.save()
            // create Order
            orderItemIds.push(orderItem._id)
        }
        const order = new Order({
            username: username,
            phone: user.phone,
            orderItem: orderItemIds,
            totalBill: totalBill,
        })
        await order.save()
        //
        await session.commitTransaction();
        session.endSession();
        //
        return order
    } catch (error) {
        //console.log(error)

        // Nếu xảy ra lỗi, hãy hủy bỏ tất cả các giao dịch và quay trở lại trước khi sửa đổi
        console.log('Loi hoai');
        await session.abortTransaction();
        session.endSession();
        throw error; // catch error
    }
}



const Order = mongoose.model("Order", orderSchema);
module.exports = Order