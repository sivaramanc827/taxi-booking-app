import React from "react";
import { Link } from "react-router-dom";

function DriverPortal() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <Link to="/" style={styles.homeLink}>🏠 Back to Home</Link>
        <h1 style={styles.title}>🧑‍✈️ Driver Portal</h1>
      </header>

      <div style={styles.content}>
        <ul style={styles.list}>
          <li>
            <Link to="/driver/earnings" style={styles.link}>💰 View total earnings</Link>
          </li>
          <li>
            <Link to="/driver/summaries" style={styles.link}>📄 Access ride summaries</Link>
          </li>
          <li>
            <Link to="/driver/ratings" style={styles.link}>⭐ Customer ratings & comments</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Segoe UI, sans-serif",
    padding: "20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "2px solid #ccc",
    paddingBottom: "10px",
    marginBottom: "20px",
  },
  homeLink: {
    textDecoration: "none",
    color: "#007bff",
    fontSize: "16px",
  },
  title: {
    fontSize: "24px",
    color: "#333",
  },
  content: {
    fontSize: "18px",
    lineHeight: "1.8",
  },
  list: {
    listStyleType: "none",
    padding: 0,
  },
  link: {
    textDecoration: "none",
    color: "#007bff",
    fontWeight: "500",
  },
};

export default DriverPortal;
