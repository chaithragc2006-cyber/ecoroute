const mongoose = require("mongoose");

const binSchema = new mongoose.Schema({
    binId: {
        type: String,
        required: true,
        unique: true
    },

    location: {
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    },

    wasteType: {
        type: String,
        enum: ["dry", "wet", "mixed"],
        required: true
    },

    area: {
        type: String
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Bin", binSchema);