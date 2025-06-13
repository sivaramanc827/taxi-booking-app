const express = require("express");
const router = express.Router();
const Driver = require("../models/Driver");

// GET all drivers
// POST /api/drivers
router.post("/", async (req, res) => {
  try {
    const { name, licenseNumber } = req.body;
    const newDriver = new Driver({ name, licenseNumber });
    await newDriver.save();
    res.status(201).json(newDriver);
  } catch (err) {
    console.error("Error saving driver:", err);
    res.status(500).json({ message: "Failed to save driver" });
  }
});
