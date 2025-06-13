const Customer = require("../models/customer");

// ✅ GET all customers
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: "Error fetching customers", error: err.message });
  }
};

// ✅ POST a new customer
exports.createCustomer = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: "Name and Email are required" });
    }

    const customer = new Customer({ name, email });
    await customer.save();
    res.status(201).json(customer);
  } catch (err) {
    res.status(500).json({ message: "Error saving customer", error: err.message });
  }
};

// ✅ PUT (update) an existing customer
exports.updateCustomer = async (req, res) => {
  try {
    const { name, email } = req.body;
    const updated = await Customer.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Customer not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating customer", error: err.message });
  }
};

// ✅ DELETE a customer
exports.deleteCustomer = async (req, res) => {
  try {
    const deleted = await Customer.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Customer not found" });
    res.json({ message: "Customer deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting customer", error: err.message });
  }
};
