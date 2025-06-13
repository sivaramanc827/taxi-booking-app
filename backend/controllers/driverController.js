// controllers/driverController.js
exports.createDriver = async (req, res) => {
  console.log("🔥 Create Driver API Hit", req.body); // log this

  try {
    const driver = new Driver(req.body);
    await driver.save();
    res.status(201).json(driver);
  } catch (err) {
    console.error("❌ Error saving driver:", err.message);
    res.status(500).json({ error: err.message });
  }
};
