const express = require("express");
const router = express.Router();

const Collection = require("../models/Collection");

// POST: Save collection details
router.post("/", async (req, res) => {
    try {
        const collection = new Collection(req.body);

        await collection.save();

        res.status(201).json({
            message: "Collection saved successfully",
            data: collection
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// GET: Get all collection records
router.get("/", async (req, res) => {
    try {
        const collections = await Collection.find()
            .sort({ collectedAt: -1 });

        res.json(collections);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;