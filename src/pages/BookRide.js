// src/pages/BookRide.js
import React, { useState } from "react";
import api from "../services/api";

function BookRide() {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [message, setMessage] = useState("");

  const handleBookRide = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/rides", {
        pickup_location: pickup,
        drop_location: drop,
        customer: customerId || "cust123", // dummy fallback
      });

      setMessage("✅ Ride booked successfully!");
      setPickup("");
      setDrop("");
      setCustomerId("");
    } catch (error) {
      console.error("Error booking ride:", error);
      setMessage("❌ Error booking ride");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🚖 Book a Ride</h2>
      <form onSubmit={handleBookRide} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Pickup Location:</label>
          <input
            type="text"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Drop Location:</label>
          <input
            type="text"
            value={drop}
            onChange={(e) => setDrop(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Customer ID (optional):</label>
          <input
            type="text"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.button}>Book Ride</button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "30px",
    backgroundColor: "#f0f8ff",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    fontFamily: "Segoe UI, sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#003366",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#444",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
  },
  button: {
    backgroundColor: "#28a745",
    color: "white",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
  message: {
    marginTop: "20px",
    textAlign: "center",
    fontWeight: "bold",
    color: "#003366",
  },
};

export default BookRide;
