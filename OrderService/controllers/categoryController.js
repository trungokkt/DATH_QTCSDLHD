const Category = require("../models/Category");
module.exports = {
    getAll: async function (req, res) {
        try {
            const categories = await Category.find()
            res.send(categories)
        } catch (error) {
            res.status(400).send(error);
        }
    },
}