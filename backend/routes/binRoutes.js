const express = require("express");
const router = express.Router();

const Bin = require("../models/Bin");
const Reading = require("../models/Reading");

// POST: Add a new dustbin
router.post("/", async (req, res) => {
    try {
        const bin = new Bin(req.body);
        await bin.save();

        res.status(201).json({
            message: "Bin added successfully",
            data: bin
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// GET: Get all dustbins with their latest readings
router.get("/", async (req, res) => {
    try {
        const bins = await Bin.find();

        const result = await Promise.all(
            bins.map(async (bin) => {
                const latestReading = await Reading.findOne({
                    binId: bin.binId
                }).sort({ timestamp: -1 });

                return {
                    ...bin.toObject(),
                    latestReading
                };
            })
        );

        res.json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;