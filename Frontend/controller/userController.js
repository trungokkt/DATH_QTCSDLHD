const APIservice = require("../services/APIService");


module.exports = {
    index: async function (req, res, next) {
        console.log(req.session.cart_item)
        const products = await APIservice.getAllProduct();
        const categories = await APIservice.getCategory()
        res.render('index', {
            products: products, categories: categories, user: req.user
        })
    },
    getAllProductByCategory: async function (req, res, next) {
        console.log(req.params.categoryid)
        const products = await APIservice.getAllProductByCategory(req.params.categoryid);
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

            const cart = await APIservice.updateCart(req.token, data)
            res.send(cart)
        } catch (error) {
            console.log(error)
        }
    },
    getCart: async function (req, res, next) {
        try {
            const cart = await APIservice.getCart(req.token)
            res.send(cart)
        } catch (error) {
            res.status(400).send("cart kh??ng t???n t???i");
        }

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
    contact_us: function (req, res, next) {
        console.log(req.user)
        res.render("contact-us", {
            user: req.user
        })
    },
    getCustomer: async function (req, res, next) {
        const customer = await APIservice.getCustomer(req.token)
        res.send(customer)
    },
    getItem: function (req, res, next) {
        res.send(req.session.cart_item)
    },
    addItem: function (req, res, next) {
        var cart_item = req.session.cart_item
        cart_item.add(req.body._id)
        req.session.cart_item = cart_item
        res.send(req.session.cart_item)
    },
    deleteItem: function (req, res, next) {
        var cart_item = req.session.cart_item
        cart_item.remove(req.body._id)
        req.session.cart_item = cart_item
        res.send(req.session.cart_item)
    },
    deleteAllItem: function (req, res, next) {
        var cart_item = req.session.cart_item
        cart_item.emty()
        req.session.cart_item = cart_item
        res.send(req.session.cart_item)
    },
    replaceItems: function (req, res, next) {
        var cart_item = req.session.cart_item
        cart_item.replaceItems(req.body.ids)
        req.session.cart_item = cart_item
        res.send(req.session.cart_item)
    },
    
}