const router = require("express").Router();
const Stock = require("../schema/StockSchema");

// Create or update stock
router.put("/create", async (req, res) => {
    const { userEmail, stock } = req.body;

    try {
        if (!userEmail || !stock || stock.length === 0) {
            return res.status(400).json({ message: "Invalid request: Missing required fields" });
        }

        // Find the stock and update it by appending new items
        const updatedStock = await Stock.findOneAndUpdate(
            { userEmail },
            { $push: { stock: { $each: stock } } },
            { new: true }
        );

        if (!updatedStock) {
            return res.status(404).json({ message: "No existing stock found for this user" });
        }

        res.status(200).json({ message: "Items added successfully", stock: updatedStock });
    } catch (error) {
        console.log("Error updating stock:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


// Get all stocks with pagination
router.get("/all", async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const data = await Stock.find({})
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ lastUpdated: -1 });

        const count = await Stock.countDocuments();

        res.status(200).json({
            success: true,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            data
        });

        
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
});

// Get stock by user email
router.get("/user/:email", async (req, res) => {
    try {
        const { email } = req.params;
        const userStock = await Stock.findOne({ userEmail: email });

        if (!userStock) {
            return res.status(404).json({
                success: false,
                message: "Stock not found for this user"
            });
        }

        res.status(200).json({
            success: true,
            data: userStock
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
});

// Delete a specific stock item
router.delete("/item/:itemId", async (req, res) => {
    const { itemId } = req.params;
    const { userEmail } = req.body;

    try {
        if (!itemId || !userEmail) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: itemId and userEmail"
            });
        }

        const result = await Stock.findOneAndUpdate(
            { userEmail },
            { $pull: { stock: { _id: itemId } } },
            { new: true }
        );

        if (!result) {
            return res.status(404).json({
                success: false,
                message: "User stock not found or item doesn't exist"
            });
        }

        res.status(200).json({
            success: true,
            message: "Stock item deleted successfully",
            data: result
        });
    } catch (error) {
        console.error("Error deleting stock item:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
});

// Delete all stock (for development only)
router.delete("/d", async (req, res) => {
    try {
        // Add authentication check in production
        if (process.env.NODE_ENV === 'production') {
            return res.status(403).json({
                success: false,
                message: "This operation is not allowed in production"
            });
        }

        const result = await Stock.deleteMany({});
        res.status(200).json({
            success: true,
            message: `Deleted ${result.deletedCount} stock records`
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to delete stocks",
            error: err.message
        });
    }
});

// Update a specific stock item
router.patch("/item/:itemId", async (req, res) => {
    const { itemId } = req.params;
    const { userEmail, updates } = req.body;

    try {
        if (!itemId || !userEmail || !updates) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: itemId, userEmail, or updates"
            });
        }

        // Construct update object dynamically
        const setUpdates = {};
        for (const key in updates) {
            setUpdates[`stock.$.${key}`] = updates[key];
        }
        setUpdates['stock.$.updatedAt'] = new Date();
        setUpdates['lastUpdated'] = new Date();

        const result = await Stock.findOneAndUpdate(
            { userEmail, "stock._id": itemId },
            { $set: setUpdates },
            { new: true }
        );

        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Stock item not found or update failed"
            });
        }

        res.status(200).json({
            success: true,
            message: "Stock item updated successfully",
            data: result
        });
    } catch (error) {
        console.error("Error updating stock item:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
});

module.exports = router;