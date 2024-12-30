import React, { useState } from "react";
import Navbar from "./components/Navbar";

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
    </div>
  );
};

export default App;
