const mongoose = require("mongoose");

const readingSchema = new mongoose.Schema({
    binId: {
        type: String,
        required: true
    },

    fillLevel: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },

    latitude: {
        type: Number,
        required: true
    },

    longitude: {
        type: Number,
        required: true
    },

    wasteType: {
        type: String,
        enum: ["dry", "wet", "mixed"],
        required: true
    },

    timestamp: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Reading", readingSchema);