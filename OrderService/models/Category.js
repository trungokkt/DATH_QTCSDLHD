const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const categorySchema = new Schema({
    value: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    children: {
        type: Schema.Types.Array
    },
});


const Category = mongoose.model("Category", categorySchema);

module.exports = Category;