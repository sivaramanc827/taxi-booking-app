const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// ✅ Mount customer routes
app.use("/api/customers", require("./routes/customers"));

// Dummy in-memory storage
let drivers = [];
let rides = [];

// ✅ Driver Routes
app.get('/api/drivers', (req, res) => {
  res.json(drivers);
});

app.post('/api/drivers', (req, res) => {
  const { name, licenseNumber } = req.body;
  if (!name || !licenseNumber) {
    return res.status(400).json({ message: "Name and License Number are required." });
  }
  const driver = {
    id: Date.now(),
    name,
    licenseNumber
  };
  drivers.push(driver);
  res.status(201).json({ message: "Driver saved!", driver });
});

app.delete('/api/drivers/:id', (req, res) => {
  const { id } = req.params;
  const index = drivers.findIndex(driver => driver.id == id);
  if (index === -1) {
    return res.status(404).json({ message: "Driver not found" });
  }
  drivers.splice(index, 1);
  res.json({ message: "Driver deleted successfully" });
});

// ✅ Ride booking route
app.post('/api/rides', (req, res) => {
  const { pickup_location, drop_location, customer } = req.body;
  if (!pickup_location || !drop_location || !customer) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const newRide = {
    id: Date.now(),
    pickup_location,
    drop_location,
    customer
  };
  rides.push(newRide);
  res.status(201).json({ message: "Ride booked!", ride: newRide });
});

app.listen(5000, () => {
  console.log("🚀 Backend running on port 5000");
});
