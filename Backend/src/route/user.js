const router = require('express').Router();
const userModel = require('../schema/userModel');

// Sign-Up
router.post('/Sign-Up', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await userModel.findOne({ email: email });

        if (user) {
            return res.status(400).send("User already exists");
        }

        const newUser = new userModel({
            name: name,
            email: email,
            password: password
        });

        await newUser.save();
        return res.status(201).send("User registered successfully");

    } catch (err) {
        console.error("Error in user.js Sign-Up", err);
        return res.status(500).send("Internal Server Error");
    }
});

// Login
router.post("/Login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: "User doesn't exist" });
        }
        if (user.password !== password) {
            return res.status(400).json({ message: "Incorrect credentials" });
        }

        // Return user details including the shop name
        return res.status(200).json({
            message: "Login successful",
            shopName: user.name, 
            email: user.email
        });

    } catch (err) {
        console.error("Error in user.js Login", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});



router.delete("/d", async (req, res) => {
    try {
        await userModel.deleteMany();
        return res.status(200).send("Deleted all users");
    } catch (err) {
        console.error("Error in user.js delete", err);
        return res.status(500).send("Internal Server Error");
    }
});


router.get("/all", async (req, res) => {
    try {
        const users = await userModel.find();
        return res.status(200).send(users);
    } catch (err) {
        console.error("Error in user.js get", err);
        return res.status(500).send("Internal Server Error");
    }
});




module.exports = router;
