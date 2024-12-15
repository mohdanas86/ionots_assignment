const express = require("express");
const User = require("../model/User");

const router = express.Router();

// Get all users (for leaderboard)
router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({ score: -1 }); // Sort by score in descending order
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new user
router.post("/create", async (req, res) => {
  const { name, email, username } = req.body;
  try {
    const newUser = new User({ name, email, username });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ error: "Duplicate username or email" });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
});

// Get user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "assignedProjects"
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update user score (optional, in case scores need to be updated independently)
router.put("/update-score/:id", async (req, res) => {
  const { score } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { score },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete user (optional)
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
