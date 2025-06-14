import React, { useEffect, useState } from "react";
import api from "../services/api";

function DriverDashboard() {
  const [drivers, setDrivers] = useState([]);
  const [name, setName] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [editId, setEditId] = useState(null);

  // Fetch all drivers
  const fetchDrivers = async () => {
    try {
      const res = await api.get("/drivers");
      setDrivers(res.data);
    } catch (err) {
      console.error("Error fetching drivers:", err);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  // Add or update driver
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: name.trim(),
      licenseNumber: licenseNumber.trim()
    };

    try {
      if (editId) {
        await api.put(`/drivers/${editId}`, payload);
        console.log("✅ Driver updated");
      } else {
        await api.post("/drivers", payload);
        console.log("✅ Driver saved");
      }

      setName("");
      setLicenseNumber("");
      setEditId(null);
      fetchDrivers();

    } catch (err) {
      console.error("❌ Error saving driver:", err.response?.data || err.message);
      alert("Failed to save driver. Check backend and network.");
    }
  };

  // Load data into form for editing
  const handleEdit = (driver) => {
    setName(driver.name);
    setLicenseNumber(driver.licenseNumber);
    setEditId(driver.id);
  };

  // Delete driver
  const handleDelete = async (id) => {
    try {
      await api.delete(`/drivers/${id}`);
      fetchDrivers();
    } catch (err) {
      console.error("Error deleting driver:", err);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🚖 Driver Dashboard</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Driver Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="License Number"
          value={licenseNumber}
          onChange={(e) => setLicenseNumber(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.addButton}>
          {editId ? "Update Driver" : "Add Driver"}
        </button>
      </form>

      <div style={styles.driverList}>
        {drivers.length === 0 ? (
          <p style={styles.noDriver}>No drivers found.</p>
        ) : (
          drivers.map((driver) => (
            <div key={driver.id} style={styles.card}>
              <p style={styles.driverName}><strong>{driver.name}</strong></p>
              <p>License: {driver.licenseNumber}</p>
              <div>
                <button onClick={() => handleEdit(driver)} style={styles.editButton}>✏️ Edit</button>
                <button onClick={() => handleDelete(driver.id)} style={styles.deleteButton}>🗑 Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    fontFamily: "Segoe UI, sans-serif",
    backgroundColor: "#f2f7ff",
    minHeight: "100vh",
  },
  heading: {
    color: "#003366",
    marginBottom: "20px",
  },
  form: {
    marginBottom: "30px",
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    alignItems: "center",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    width: "200px",
  },
  addButton: {
    backgroundColor: "#28a745",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  driverList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  card: {
    backgroundColor: "white",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  driverName: {
    fontSize: "18px",
    color: "#003366",
  },
  editButton: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "5px 10px",
    marginRight: "10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    color: "white",
    padding: "5px 10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  noDriver: {
    color: "#555",
  },
};

export default DriverDashboard;
