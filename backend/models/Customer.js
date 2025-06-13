const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {      // ⛔ Your model has "phone" instead — mismatch!
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Customer", customerSchema);
