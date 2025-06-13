const Ride = require("../models/Ride");

const bookRide = async (req, res) => {
  try {
    const { pickup_location, drop_location, customer } = req.body;

    const newRide = new Ride({
      pickup_location,
      drop_location,
      customer,
    });

    await newRide.save();
    res.status(201).json({ message: "Ride booked successfully", ride: newRide });
  } catch (error) {
    res.status(500).json({ message: "Error booking ride", error: error.message });
  }
};

module.exports = {
  bookRide,
};
