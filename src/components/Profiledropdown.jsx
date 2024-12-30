import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";

const Profiledropdown = ({ onLogout }) => {
  const [accountType, setAccountType] = useState("Real");
  const [realBalance, setRealBalance] = useState(0);
  const [demoBalance, setDemoBalance] = useState(0);

  useEffect(() => {
    const app_id = "66854";
    const token = "UBgvoJI3qpplCBq";
    const socket = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);

    socket.onopen = () => {
      socket.send(JSON.stringify({ authorize: token }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.authorize) {
        socket.send(JSON.stringify({ balance: 1, account: "all" }));
      }

      if (data.balance) {
        setRealBalance(data.balance.real);
        setDemoBalance(data.balance.demo);
      }
    };

    socket.onclose = () => console.log("WebSocket disconnected.");

    return () => socket.close();
  }, []);

  return (
    <div className="relative">
      <button className="flex items-center space-x-2">
        <FaUserCircle className="text-xl" />
        <span>{accountType} Account</span>
      </button>
      <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-md shadow-lg">
        <div className="p-4">
          <p className="font-semibold">
            {accountType} Balance: KSH {accountType === "Real" ? realBalance : demoBalance}
          </p>
          <button
            className="w-full mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={() => setAccountType(accountType === "Real" ? "Demo" : "Real")}
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
    </div>
  );
};

export default Profiledropdown;