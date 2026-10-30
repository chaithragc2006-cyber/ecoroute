const express = require("express");
const router = express.Router();

const Bin = require("../models/Bin");
const Reading = require("../models/Reading");

// GET: Find bins that need collection
router.get("/", async (req, res) => {
    try {
        const bins = await Bin.find();

        const result = [];

        for (const bin of bins) {
            const reading = await Reading.findOne({
                binId: bin.binId
            }).sort({ timestamp: -1 });

            if (reading && reading.fillLevel >= 80) {
                result.push({
                    binId: bin.binId,
                    fillLevel: reading.fillLevel,
                    latitude: reading.latitude,
                    longitude: reading.longitude,
                    wasteType: reading.wasteType
                });
            }
        }

        result.sort((a, b) => b.fillLevel - a.fillLevel);

        res.json({
            message: "Collection route generated",
            totalBins: result.length,
            route: result
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;