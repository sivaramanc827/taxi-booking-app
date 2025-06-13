import React, { useEffect, useState } from "react";
import api from "../services/api";

function CustomerDashboard() {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch all customers on mount
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await api.get("/customers");
      setCustomers(response.data);
    } catch (err) {
      console.error("Error fetching customers:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add or update customer
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { name: name.trim(), email: email.trim() };

    try {
      if (editId) {
        const response = await api.put(`/customers/${editId}`, payload);
        setMessage("✅ Customer updated successfully");

        // ✅ Update local state directly
        setCustomers((prev) =>
          prev.map((c) => (c._id === editId ? { ...c, ...payload } : c))
        );
      } else {
        const response = await api.post("/customers", payload);
        setMessage("✅ Customer added successfully");

        // ✅ Add new customer to local state
        setCustomers((prev) => [...prev, response.data]);
      }

      setName("");
      setEmail("");
      setEditId(null);
    } catch (err) {
      console.error("Error saving customer:", err.response?.data || err.message);
      setMessage("❌ Failed to save customer");
    }
  };

  // ✅ Edit customer
  const handleEdit = (customer) => {
    setName(customer.name);
    setEmail(customer.email);
    setEditId(customer._id);
  };

  // ✅ Delete customer
  const handleDelete = async (id) => {
    try {
      await api.delete(`/customers/${id}`);
      setCustomers((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Error deleting customer:", err);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>👤 Customer Dashboard</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Customer Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.submitBtn}>
          {editId ? "Update" : "Add"}
        </button>
      </form>

      {message && <p style={styles.message}>{message}</p>}
      {loading && <p style={styles.loading}>Loading customers...</p>}

      <ul style={styles.list}>
        {customers.map((customer) => (
          <li key={customer._id} style={styles.card}>
            <p style={styles.name}>{customer.name}</p>
            <p style={styles.email}>{customer.email}</p>
            <div>
              <button
                onClick={() => handleEdit(customer)}
                style={styles.editBtn}
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => handleDelete(customer._id)}
                style={styles.deleteBtn}
              >
                🗑 Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// 🔸 Styles remain same
const styles = {
  container: {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "30px",
    backgroundColor: "#f0f7ff",
    borderRadius: "12px",
    fontFamily: "Segoe UI, sans-serif",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    color: "#003366",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  submitBtn: {
    padding: "10px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  message: {
    textAlign: "center",
    color: "#007bff",
    marginBottom: "10px",
  },
  loading: {
    textAlign: "center",
    color: "#555",
  },
  list: {
    listStyle: "none",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  name: {
    fontWeight: "bold",
    fontSize: "16px",
  },
  email: {
    color: "#555",
    marginBottom: "10px",
  },
  editBtn: {
    marginRight: "10px",
    backgroundColor: "#007bff",
    color: "white",
    padding: "5px 10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  deleteBtn: {
    backgroundColor: "#dc3545",
    color: "white",
    padding: "5px 10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default CustomerDashboard;
