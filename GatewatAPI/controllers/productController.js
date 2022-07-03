const axios = require('axios')
const host = require("../config/host")

module.exports = {
    getProduct: async function (req, res, next) {
        try {
            if (req.query.code) {
                return next();
            }
            const products = await axios({
                url: `${host.ProductService}/vaccines`,
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            return res.send(products.data)
        } catch (error) {
            res.status(404).send(error);
        }
    },
    getProductByCode: async function (req, res) {
        try {
            const code = req.query.code || req.body.code
            const product = await axios({
                method: 'get',
                url: `${host.ProductService}/vaccines/code?code=${code}`,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            res.send(product.data)
        } catch (error) {
            res.status(404).send(error);
        }
    },
    getProductByArray: async function (req, res) {
        try {

        } catch (error) {
            res.status(404).send(error);
        }
    },
    getProductByName: async function (req, res) {
        try {
            const keyword = req.query.name || req.body.name
            const products = await axios({
                url: `${host.ProductService}/vaccines/name?name=${keyword}`,
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            return res.send(products.data)
        } catch (error) {
            res.status(404).send(error);
        }
    },
    createProduct: async function (req, res) {
        try {
            const vaccine = req.body
            console.log(vaccine)
            const product = await axios({
                method: 'post',
                url: `${host.ProductService}/vaccines`,
                headers: {
                    'Content-Type': 'application/json',
                },
                data: vaccine
            })
            res.send(product.data)
        } catch (error) {
            res.status(404).send(error);
        }
    },
    updateProduct: async function (req, res) {
        try {
            const vaccine = req.body
            const product = await axios({
                method: 'put',
                url: `${host.ProductService}/vaccines`,
                headers: {
                    'Content-Type': 'application/json',
                },
                data: vaccine
            })
            res.send(product.data)
        } catch (error) {
            res.status(404).send(error);
        }
    },
    deleteProduct: async function (req, res) {
        try {
            const vaccine = req.body
            const product = await axios({
                method: 'delete',
                url: `${host.ProductService}/vaccines`,
                headers: {
                    'Content-Type': 'application/json',
                },
                data: vaccine
            })
            res.send(product.data)
        } catch (error) {
            res.status(404).send(error);
        }
    },
    getCategory: async function (req, res) {
        try {
            const categories = await axios({
                method: 'get',
                url: `${host.ProductService}/categories`,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            res.send(categories.data)
        } catch (error) {
            res.status(404).send(error);
        }
    }
};