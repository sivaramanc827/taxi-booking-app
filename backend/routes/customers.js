const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");


// GET all
router.get("/", async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
});

// POST new
router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;
    const customer = new Customer({ name, email });
    await customer.save();
    res.json(customer);
  } catch (err) {
    console.error("POST /api/customers error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT update
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const customer = await Customer.findByIdAndUpdate(id, { name, email }, { new: true });
  res.json(customer);
});

// DELETE
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Customer.findByIdAndDelete(id);
  res.json({ success: true });
});

module.exports = router;
