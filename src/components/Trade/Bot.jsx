import React, { useState, useEffect } from "react";
import DerivAPIBasic from "@deriv/deriv-api";

const BotPage = () => {
  const [connection, setConnection] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [log, setLog] = useState([]);
  const [stake, setStake] = useState(1);
  const [market, setMarket] = useState("frxEURUSD");
  const [duration, setDuration] = useState(5);

  // Initialize API Connection
  useEffect(() => {
    const websocket = new WebSocket("wss://ws.binaryws.com/websockets/v3?app_id=YOUR_APP_ID");
    const api = new DerivAPIBasic({ connection: websocket });
    setConnection(api);

    return () => {
      websocket.close();
    };
  }, []);

  const startBot = async () => {
    if (!connection) return;

    setIsRunning(true);
    try {
      // Authorize the API token
      await connection.authorize("UBgvoJI3qpplCBq");

      // Subscribe to ticks
      const ticksResponse = await connection.subscribe({ ticks: market });
      ticksResponse.onMessage((tick) => {
        setLog((prev) => [...prev, `Price: ${tick.tick.quote}`]);
      });

      // Send Buy Contract Request
      await connection.buy({
        proposal: 1,
        amount: stake,
        basis: "stake",
        contract_type: "CALL",
        currency: "USD",
        duration: duration,
        duration_unit: "s",
        symbol: market,
      });
    } catch (error) {
      console.error("Error starting the bot:", error);
      setLog((prev) => [...prev, `Error: ${error.message}`]);
    }
  };

  const stopBot = () => {
    if (!connection) return;
    connection.disconnect();
    setIsRunning(false);
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-darkBackground">
      <h1 className="text-2xl font-bold mb-4">Deriv Trading Bot</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium">Market:</label>
        <input
          type="text"
          value={market}
          onChange={(e) => setMarket(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Stake (USD):</label>
        <input
          type="number"
          value={stake}
          onChange={(e) => setStake(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Duration (seconds):</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="flex space-x-4">
        <button
          onClick={startBot}
          disabled={isRunning}
          className="px-4 py-2 bg-green-600 text-white rounded disabled:bg-gray-400"
        >
          Start Bot
        </button>
        <button
          onClick={stopBot}
          disabled={!isRunning}
          className="px-4 py-2 bg-red-600 text-white rounded disabled:bg-gray-400"
        >
          Stop Bot
        </button>
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-bold">Log</h2>
        <div className="h-64 overflow-y-auto bg-white p-4 rounded">
          {log.map((entry, index) => (
            <p key={index}>{entry}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BotPage;
