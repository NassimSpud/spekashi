import React, { useState } from "react";
import Navbar from "./components/Navbar";
import LandingPage from "./components/landing";

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  return (
    <div>
      <Navbar
        isLoggedIn={isLoggedIn}
        setLoggedIn={setLoggedIn}
        token={token}
        setToken={setToken}
      />
      <LandingPage />
    </div>
  );
};

export default App;
