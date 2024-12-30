import React, { useEffect } from "react";
import { FaTelegram } from "react-icons/fa";
import { Link } from "react-router-dom";
import Profiledropdown from "./Profiledropdown";

const Navbar = ({ isLoggedIn, setLoggedIn, token, setToken }) => {
  const app_id = "66854";

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const oauthToken = urlParams.get("token1");

    if (oauthToken) {
      setToken(oauthToken);
      setLoggedIn(true);
      localStorage.setItem("token", oauthToken);
      window.history.replaceState({}, document.title, "/");
    }
  }, [setToken, setLoggedIn]);

  const handleLogin = () => {
    const redirectUri = encodeURIComponent(window.location.href);
    window.location.href = `https://oauth.deriv.com/oauth2/authorize?app_id=${app_id}&redirect_uri=${redirectUri}`;
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <nav className="bg-[#0d0d0f] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Telegram */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-red-500">
              Spekashi
            </Link>
            <button
              className="ml-4 flex items-center px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 text-white transition duration-200"
              onClick={() =>
                window.open("https://t.me/your-telegram-channel", "_blank")
              }
            >
              <FaTelegram className="mr-2" />
              Telegram
            </button>
          </div>

          {/* Center Link */}
          <div className="text-center">
            <Link
              to="/trading"
              className="text-lg font-semibold hover:text-red-500 transition duration-200"
            >
              Trading
            </Link>
          </div>

          {/* Login/Profile Section */}
          <div>
            {isLoggedIn ? (
              <Profiledropdown onLogout={handleLogout} />
            ) : (
              <button
                onClick={handleLogin}
                className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 text-white font-medium transition duration-200"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
