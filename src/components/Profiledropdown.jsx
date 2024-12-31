import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";

const Profiledropdown = ({ token, onLogout }) => {
  const [accountType, setAccountType] = useState("Real");
  const [balances, setBalances] = useState({ real: 0, demo: 0 });
  const [exchangeRate, setExchangeRate] = useState(140); // Fixed USD to KSH rate
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (!token) return;

    const app_id = "66854";
    const socket = new WebSocket(
      `wss://ws.derivws.com/websockets/v3?app_id=${app_id}`
    );

    socket.onopen = () => {
      // Authorize the user
      socket.send(JSON.stringify({ authorize: token }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.msg_type === "authorize") {
        const userFullName = data.authorize.fullname || "User";
        setUserName(userFullName);

        // Fetch balances for all accounts
        socket.send(JSON.stringify({ balance: 1, account: "all" }));
      }

      if (data.msg_type === "balance") {
        const accounts = data.balance.accounts;
        setBalances({
          real: (accounts.real || 0) * exchangeRate,
          demo: (accounts.demo || 0) * exchangeRate,
        });
      }
    };

    socket.onclose = () => console.log("WebSocket disconnected.");

    return () => socket.close();
  }, [token, exchangeRate]);

  return (
    <div className="relative">
      <button
        className="flex items-center space-x-2 text-white"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <FaUserCircle className="text-xl" />
        <span>{accountType} Account</span>
      </button>
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-md shadow-lg">
          <div className="p-4">
            <p className="font-semibold">Welcome, {userName}</p>
            <p className="mt-2">
              {accountType} Balance: KSH{" "}
              {accountType === "Real"
                ? balances.real.toFixed(2)
                : balances.demo.toFixed(2)}
            </p>
            <button
              className="w-full mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={() =>
                setAccountType(accountType === "Real" ? "Demo" : "Real")
              }
            >
              Switch to {accountType === "Real" ? "Demo" : "Real"} Account
            </button>
            <button
              className="w-full mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              onClick={onLogout}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profiledropdown;
