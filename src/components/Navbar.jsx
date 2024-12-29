import React from 'react';
import { FaTelegramPlane } from 'react-icons/fa'; // Import Telegram icon from FontAwesome

const Navbar = () => {
  const handleLogin = () => {
    // Redirect to the Deriv login page
    const derivLoginUrl = 'https://oauth.deriv.com/oauth2/authorize?app_id=66854&l=en&brand=deriv';
    window.location.href = derivLoginUrl;
  };

  const handleTelegram = () => {
    // Redirect to Telegram group or channel
    const telegramUrl = 'https://t.me/your-telegram-channel'; // Replace with your Telegram link
    window.location.href = telegramUrl;
  };

  return (
    <nav className="bg-black text-white py-4">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <img
              src="/path-to-your-logo.png" // Replace with your logo's path
              alt="Spekashi Logo"
              className="w-8 h-8 mr-2"
            />
            <h1 className="text-lg font-bold tracking-wide">SPEKASHI</h1>
          </div>
          {/* Telegram Button */}
          <button
            onClick={handleTelegram}
            className="flex items-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
          >
            <FaTelegramPlane className="mr-2" />
          </button>
        </div>

        {/* Login Button */}
        <div>
          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition"
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
