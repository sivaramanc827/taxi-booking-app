const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// Import your models
const Driver = require("./models/Driver");
const Customer = require("./models/Customer");

// Connect to DB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

// Dummy Data
const seedData = async () => {
  try {
    await Driver.deleteMany();
    await Customer.deleteMany();

    await Driver.insertMany([
      { name: "John Doe", licenseNumber: "XYZ123" },
      { name: "Jane Smith", licenseNumber: "ABC456" },
    ]);

    await Customer.insertMany([
      { name: "Alice", phone: "9876543210" },
      { name: "Bob", phone: "9123456780" },
    ]);

    console.log("🚀 Dummy data inserted!");
    process.exit();
  } catch (error) {
    console.error("❌ Error inserting dummy data:", error);
    process.exit(1);
  }
};

seedData();
