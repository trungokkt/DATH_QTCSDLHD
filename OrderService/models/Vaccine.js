const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vaccineSchema = new Schema({
    id: {
        unique: true,
        type: String,
    },
    code: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
        dropDups: true,
    },
    name: {
        type: String,
        uppercase: true,
        required: true,
    },
    prevention: {
        type: String
    },
    preventions: {
        type: [String]
    },
    description: {
        type: String
    },
    content: {
        type: String
    },
    howToUse: {
        type: String
    },
    unit: {
        type: String,
        default: "mũi"
    },
    country: {
        type: String
    },
    manufacturer: {
        type: String
    },
    price: {
        type: Number
    },
    allowedToSell: {
        type: Boolean,
        default: true
    },
    types: {
        type: Schema.Types.Array,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDelete: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: String
    },
    updatedAt: {
        type: Date,
    },
    updatedBy: {
        type: String
    },
    order: {
        type: Number
    },
    photo: {
        type: String
    },
    sellType: {
        type: String,
        default: "retail"
    },
    statusId: {
        type: String
    },
    statusName: {
        type: String
    },
    statusIsCustom: {
        type: Boolean,
        default: false
    }
});
vaccineSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const vaccine = this
    vaccine.id = vaccine._id
    if (vaccine.order > 0) {
        vaccine.statusName = "Còn hàng"
    } else {
        vaccine.statusName = "Hết hàng"
    }
    next()
})
vaccineSchema.statics.findByName = async (name) => {
    // Search for a user by username and password.
    const vaccines = await Vaccine.find({
        $or: [
            { name: new RegExp(name, 'i') },
            { code: new RegExp(name, 'i') },
            { prevention: new RegExp(name, 'i') },
            { manufacturer: new RegExp(name, 'i') }
        ]
    })
    return vaccines
}
vaccineSchema.statics.findByCode = async (code) => {
    // Search for a user by username and password.
    const vaccines = await Vaccine.findOne({ code: code })
    return vaccines
}
const Vaccine = mongoose.model("Vaccine", vaccineSchema);

module.exports = Vaccine;