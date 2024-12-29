import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo on the left */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-green-600">
              Logo
            </a>
          </div>

          {/* Trading Page in the center */}
          <div className="flex-1 text-center">
            <a href="/trading" className="text-lg text-gray-800 dark:text-white hover:text-green-600">
              Trading
            </a>
          </div>

          {/* Sign-In Button on the right */}
          <div className="flex-shrink-0">
            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
