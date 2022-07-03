const APIservice = require("../services/APIService");


module.exports = {
    index: async function (req, res, next) {
        const products = await APIservice.getAllProduct();
        const categories = await APIservice.getCategory()
        res.render('index', {
            products: products, categories: categories, user: req.user
        })
    },
    productDetail: async function (req, res, next) {
        const code = req.params.code
        const product = await APIservice.getProductByCode(code);
        const categories = await APIservice.getCategory()
        res.render('detail', {
            product: product, categories: categories, user: req.user
        })
    },
    injection_registration: async function (req, res, next) {
        const products = await APIservice.getAllProduct();
        res.render('injection_registration', {
            user: req.user,
            products: products
        })
    },
    addCart: async function (req, res, next) {
        try {
            const data = req.body
            delete data.submit
            if (!data.vaccines) {
                data.vaccines = data['vaccines[]']
            } else {
                data.vaccines = [data.vaccines]
            }
            const cart = await APIservice.addCart(req.token, data)
            res.send(cart)
        } catch (error) {
            console.log(error)
        }

    },
    updateCart: async function (req, res, next) {
        try {
            const data = req.body
            console.log(req.body)
            delete data.submit
            if (!data.vaccines) {
                data.vaccines = data['vaccines[]']
            } else {
                data.vaccines = [data.vaccines]
            }
            const cart = await APIservice.updateCart(req.token, data)
            res.send(cart)
        } catch (error) {
            console.log(error)
        }

    },
    getCart: async function (req, res, next) {
        console.log(req.token)

        const cart = await APIservice.getCart(req.token)
        res.send(cart)
    },
    deleteCart: async function (req, res, next) {
        const cart = await APIservice.deleteCart(req.token, req.body.customerId)
        res.send(cart)
    },
    deleteAllCart: async function (req, res, next) {
        const result = await APIservice.deleteAllCart(req.token)
        res.send(result)
    },
    table_price: async function (req, res, next) {
        const products = await APIservice.getAllProduct();
        res.render('table-price', { user: req.user, products: products })
    },
    search: async function (req, res, next) {
        const keyword = req.query.keyword || req.body.keyword
        const products = await APIservice.getProductByName(keyword);
        const categories = await APIservice.getCategory()
        res.render('index', {
            products: products, categories: categories, user: req.user
        })
    },
    createOrder: async function (req, res, next) {
        const result = await APIservice.createOrder(req.token)
        res.redirect("/")
    },
    lookup_information_index: async function (req, res, next) {
        const orders = await APIservice.getOrder(req.token)
        res.render('lookup_infomation', {
            user: req.user,
            orders: orders
        });
    },
    contact_us : function (req,res,next) {
        console.log(req.user)
        res.render("contact-us",{
            user: req.user
        })
    }
}