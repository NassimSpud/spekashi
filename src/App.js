import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./components/landing";
import Trading from "./components/Trade/Trading";

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  return (
    <Router>
      <Navbar
        isLoggedIn={isLoggedIn}
        setLoggedIn={setLoggedIn}
        token={token}
        setToken={setToken}
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/trading" element={<Trading />} />
      </Routes>
    </Router>
  );
};

export default App;
