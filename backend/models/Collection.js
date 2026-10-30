const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema({
    binId: {
        type: String,
        required: true
    },

    collectedAmount: {
        type: Number,
        required: true,
        min: 0
    },

    wasteType: {
        type: String,
        enum: ["dry", "wet", "mixed"],
        required: true
    },

    collectorName: {
        type: String,
        required: true
    },

    collectedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Collection", collectionSchema);