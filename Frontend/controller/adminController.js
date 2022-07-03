var APIService = require("../services/APIService");

module.exports = {
    dashboard: async function (req, res, next) {
        try {
            const products = await APIService.getAllProduct();
            const categories = await APIService.getCategory()
            res.render('dashboard', {
                layout: 'admin', products: products
                , categories: categories, user: req.user
            })
        } catch (error) {
            res.redirect("/404")
        }

    },
    customer: async function (req, res, next) {
        try {
            const orders = await APIService.getAllOrder(req.token);
            res.render('order-admin', { layout: 'admin', user: req.user, orders: orders })
        } catch (error) {
            res.redirect("/404")
        }
    },
    createProduct: async function (req, res, next) {
        try {
            const newVaccine = req.body
            delete newVaccine._id
            const product = await APIService.createProduct(newVaccine);
            res.redirect('/admin/product')
        } catch (error) {
            res.redirect("/404")
        }
    },
    updateProduct: async function (req, res, next) {
        try {
            const product = await APIService.updateProduct(req.body);

            //render lai
            res.redirect('/admin/product')
        } catch (error) {
            res.redirect("/404")
        }
    },
    deleteOrderItem: async function (req, res, next) {
        //update
        try {
            const _id = req.body._id
            const result = await APIService.deleteOrderItem(_id, req.token);

            //render lai
            res.send(result)
        } catch (error) {
            res.redirect("/404")
        }
    },
    deleteOrderItemProduct: async function (req, res, next) {
        try {
            //update
            const { orderItemId, vaccineId } = req.body
            console.log(orderItemId, vaccineId)
            const result = await APIService.deleteOrderItemProduct(orderItemId, vaccineId, req.token);
            //render lai
            res.send(result)
        } catch (error) {
            res.redirect("/404")
        }
    }
}