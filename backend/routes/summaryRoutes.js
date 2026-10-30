const express = require("express");
const router = express.Router();

const Collection = require("../models/Collection");

// GET: Waste summary
router.get("/", async (req, res) => {
    try {
        const summary = await Collection.aggregate([
            {
                $group: {
                    _id: "$wasteType",
                    totalAmount: {
                        $sum: "$collectedAmount"
                    }
                }
            }
        ]);

        res.json({
            dry: 0,
            wet: 0,
            mixed: 0,
            ...Object.fromEntries(
                summary.map(item => [
                    item._id,
                    item.totalAmount
                ])
            )
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;