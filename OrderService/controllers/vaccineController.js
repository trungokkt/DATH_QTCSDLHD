const Vaccine = require("../models/Vaccine");

module.exports = {
    getAllProduct: async function (req, res) {
        try {
            const vaccines = await Vaccine.find({ isDelete: false }).sort({ 'createdAt': -1 })
            res.send(vaccines)
        } catch (error) {
            res.status(400).send(error);
        }
    },
    findProduct: async function (req, res) {
        try {
            const keyword = req.body.keyword
            console.log(req.body.keyword)
            const vaccines = await Vaccine.findByKeyword(keyword)
            res.send(vaccines)
        } catch (error) {
            res.status(400).send(error);
        }
    },
    getProductByCategory: async function (req, res) {
        try {
            const categoryid = req.query.categoryid || req.body.categoryid
            console.log(categoryid)
            const vaccines = await Vaccine.find({ types: {$elemMatch:{$eq: categoryid} } }).sort({ 'createdAt': -1 })
            res.send(vaccines)
        } catch (error) {
            res.status(400).send(error);
        }
    },
    findProductByCode: async function (req, res) {
        try {
            const code = req.query.code || req.body.code
            if (!code) {
                res.status(404).send({
                    "message": "code does not exist"
                });
            }
            const vaccine = await Vaccine.findByCode(code)
            res.send(vaccine)
        } catch (error) {
            res.status(400).send(error);
        }
    },
    findProductById: async function (req, res) {
        try {
            const _id = req.query._id || req.body._id
            const vaccine = await Vaccine.findById(_id)
            res.send(vaccine)
        } catch (error) {
            res.status(400).send(error);
        }
    },
    findProductByArray: async function (req, res) {
        try {
            const ids = req.query.vaccines || req.body.vaccines || req.header.vaccines
            const vaccine = await Vaccine.find({ _id: { "$in": ids } })
            res.send(vaccine)
        } catch (error) {
            res.status(400).send(error);
        }
    },
    createProduct: async function (req, res) {
        try {
            const vaccine = new Vaccine(req.body);
            vaccine.types[0] = req.body.type
            await vaccine.save();
            res.send(vaccine);
        } catch (error) {
            res.status(400).send(error);
        }
    },
    updateProduct: async function (req, res) {
        try {
            var vaccine = await Vaccine.findOne({ _id: req.body._id })
            if (!vaccine) {
                throw new Error()
            }
            vaccine.code = req.body.code || vaccine.code
            vaccine.name = req.body.name || vaccine.name
            vaccine.prevention = req.body.prevention || vaccine.prevention
            vaccine.description = req.body.description || vaccine.description
            vaccine.manufacturer = req.body.manufacturer || vaccine.manufacturer
            vaccine.price = req.body.price || vaccine.price
            vaccine.types[0] = req.body.type || vaccine.types[0]
            vaccine.price = req.body.price || vaccine.price
            vaccine.order = req.body.order || vaccine.order
            vaccine.photo = req.body.photo || vaccine.photo
            await vaccine.save()
            res.send(vaccine)
        } catch (error) {
            res.status(400).send(error);
        }
    },
    deleteProduct: async function (req, res) {
        try {
            var vaccine = await Vaccine.findOne({ _id: req.body._id })
            if (!vaccine) {
                throw new Error()
            }
            vaccine.isDelete = true

            await vaccine.save()
            res.send(vaccine)
        } catch (error) {
            res.status(400).send(error);
        }
    }
}