const express = require("express");
const router = express.Router();

const Reading = require("../models/Reading");

// POST: Save reading and send live update
router.post("/", async (req, res) => {
    try {
        const reading = new Reading(req.body);
        await reading.save();

        // Send update to connected frontend clients
        const io = req.app.get("io");
        io.emit("binUpdate", reading);

        res.status(201).json({
            message: "Reading saved successfully",
            data: reading
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// GET: Retrieve all readings
router.get("/", async (req, res) => {
    try {
        const readings = await Reading.find().sort({ timestamp: -1 });
        res.json(readings);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;