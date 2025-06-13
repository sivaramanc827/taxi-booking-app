import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import DriverDashboard from "./components/DriverDashboard";
import CustomerDashboard from "./components/CustomerDashboard";
import BookRide from "./pages/BookRide";
import DriverPortal from "./components/DriverPortal";
import Header from "./components/Header"; // ✅ Don't forget this!
import DriverEarnings from "./components/DriverEarnings";
import RideSummaries from "./components/RideSummaries";
import DriverRatings from "./components/DriverRatings";


function App() {
  return (
    <Router>
      <Header />  {/* Top nav bar with Driver Portal link */}
      
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book" element={<BookRide />} />
        <Route path="/drivers" element={<DriverDashboard />} />
        <Route path="/customers" element={<CustomerDashboard />} />
        <Route path="/driver" element={<DriverPortal />} />
         <Route path="/driver/earnings" element={<DriverEarnings />} />
         <Route path="/driver/summaries" element={<RideSummaries />} />
         <Route path="/driver/ratings" element={<DriverRatings />} />

        
      </Routes>
    </Router>
  );
}

export default App;
