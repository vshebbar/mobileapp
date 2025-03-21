const express = require("express");
const pool = require("../database");
const router = express.Router();

// 🎯 Register a new user
router.post("/", async (req, res) => {
  try {
    const { email, phone, photo, attributes } = req.body;

    if (!email || !phone) {
      return res.status(400).json({ error: "Email and phone are required" });
    }

    const query = `INSERT INTO users (email, phone, photo, attributes) VALUES (?, ?, ?, ?)`;

    // ✅ Ensure using the Promise-based query
    const [result] = await pool.execute(query, [email, phone, photo, JSON.stringify(attributes)]);

    console.log("🔍 DB Response:", result);

    if (!result || result.affectedRows === 0) {
      throw new Error("User insertion failed.");
    }

    res.status(201).json({ userId: result.insertId, message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

// 🎯 Update user profile
router.put("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { email, phone, photo, attributes } = req.body;
    const query = `UPDATE users SET email=?, phone=?, photo=?, attributes=? WHERE id=?`;
    const [result] = await pool.execute(query, [email, phone, photo, JSON.stringify(attributes), userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
});

// 🎯 Fetch user profile
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const query = `SELECT * FROM users WHERE id = ?`;
    const [rows] = await pool.execute(query, [userId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// 🎯 Delete user profile
router.delete("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const query = `DELETE FROM users WHERE id = ?`;
    const [result] = await pool.execute(query, [userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

module.exports = router;
