const axios = require('axios')
const host = require("../config/host")

module.exports = {
    getCart: async function (req, res, next) {
        try {
            const Authorization = "Bearer " + req.token
            const cart = await axios({
                url: `${host.CartService}/cart`,
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': Authorization
                }
            })

            return res.send(cart.data)
        } catch (error) {
            res.status(404).send(error);
        }
    },
    createCart: async function (req, res, next) {
        try {
            const data = req.body
            const Authorization = "Bearer " + req.token
            const cart = await axios({
                url: `${host.CartService}/cart/add`,
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': Authorization
                },
                data: data
            })
            res.send(cart.data)
        } catch (error) {
            res.status(404).send(error);
        }
    },
    deleteCart: async function (req, res, next) {
        try {
            const customerId = req.body.customerId ||req.query.customerId
            const Authorization = "Bearer " + req.token
            const cart = await axios({
                url: `${host.CartService}/cart/remove`,
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': Authorization
                },
                data: { customerId: customerId }
            })
            res.send(cart.data)
        } catch (error) {
            res.status(404).send(error);
        }
    },
    updateCart: async function (req, res, next) {
        try {
            const data = req.body
            const Authorization = "Bearer " + req.token
            const cart = await axios({
                url: `${host.CartService}/cart/update`,
                method: "put",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': Authorization
                },
                data: data
            })
            res.send(cart.data)
        } catch (error) {
            res.status(404).send(error);
        }
    }
};