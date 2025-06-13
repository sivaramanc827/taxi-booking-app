import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🚕 Welcome to Taxi Booking System</h1>

      <div style={styles.buttonGroup}>
        <Link to="/book" style={styles.button}>📍 Book a Ride</Link>
        <Link to="/drivers" style={styles.button}>👨‍✈️ Driver Dashboard</Link>
        <Link to="/customers" style={styles.button}>🧑‍💼 Customer Dashboard</Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: "linear-gradient(to right, #e0f7fa, #e1bee7)",
    fontFamily: "Segoe UI, sans-serif",
    textAlign: "center"
  },
  heading: {
    fontSize: "32px",
    color: "#333",
    marginBottom: "30px"
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  button: {
    textDecoration: "none",
    backgroundColor: "#007bff",
    color: "white",
    padding: "12px 25px",
    borderRadius: "10px",
    fontSize: "16px",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  }
};

export default HomePage;
