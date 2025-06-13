// routes/driverRoutes.js
const express = require("express");
const router = express.Router();
const { createDriver } = require("../controllers/driverController");

router.post("/", createDriver); // Add this line
router.get("/", (req, res) => {
  res.send(" http://localhost:3000 ✅");
});

module.exports = router;
