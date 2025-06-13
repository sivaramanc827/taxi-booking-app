// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header style={styles.header}>
      <h2 style={styles.title}>🚖 Taxi Booking System</h2>
      <nav>
        <Link to="/driver" style={styles.link}>👨‍✈️ Driver Portal</Link>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: "#333",
    color: "white",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    margin: 0,
    fontSize: "20px",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    backgroundColor: "#007bff",
    padding: "8px 15px",
    borderRadius: "6px",
  }
};

export default Header;
