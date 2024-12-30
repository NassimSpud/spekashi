import React, { useEffect, useState } from "react";

const Trading = () => {
  const [asset, setAsset] = useState("NASDAQ:AAPL");
  const [stake, setStake] = useState(10);
  const [multiplier, setMultiplier] = useState(30);
  const [tradeHistory, setTradeHistory] = useState([]);

  useEffect(() => {
    // Add the TradingView widget script
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      new window.TradingView.widget({
        container_id: "tradingview_widget",
        autosize: true,
        symbol: asset,
        interval: "D",
        timezone: "Etc/UTC",
        theme: "light",
        style: "1",
        locale: "en",
        toolbar_bg: "#f9f9f9",
        enable_publishing: false,
        allow_symbol_change: true,
        save_image: false,
      });
    };
    document.body.appendChild(script);
  }, [asset]);

  const handleTrade = (type) => {
    const newTrade = {
      type,
      asset,
      stake,
      multiplier,
      timestamp: new Date().toLocaleString(),
    };
    setTradeHistory([newTrade, ...tradeHistory]);
  };

  return (
    <div className="h-screen bg-gray-100 text-black flex">
      {/* Trading Chart */}
      <div id="tradingview_widget" className="w-2/3 h-full rounded-lg shadow-md" />

      {/* Trading Controls */}
      <div className="w-1/3 bg-white p-4 rounded-lg shadow-md space-y-4 flex flex-col items-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Trade</h2>

        {/* Stake */}
        <div className="w-full">
          <label className="block text-gray-700 font-medium mb-2">Stake:</label>
          <input
            type="number"
            value={stake}
            onChange={(e) => setStake(e.target.value)}
            className="w-full p-2 border rounded-md"
            min="1"
          />
        </div>

        {/* Multiplier */}
        <div className="w-full">
          <label className="block text-gray-700 font-medium mb-2">Multiplier:</label>
          <input
            type="number"
            value={multiplier}
            onChange={(e) => setMultiplier(e.target.value)}
            className="w-full p-2 border rounded-md"
            min="1"
          />
        </div>

        {/* Commission and Stop-Out */}
        <div className="w-full text-sm text-gray-500">
          <p>Commission: ${(stake * 0.028).toFixed(2)} USD</p>
          <p>Stop Out: {stake} USD</p>
        </div>

        {/* Take Profit and Stop Loss */}
        <div className="w-full">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox" />
            <span>Take Profit</span>
          </label>
          <label className="flex items-center space-x-2 mt-2">
            <input type="checkbox" className="form-checkbox" />
            <span>Stop Loss</span>
          </label>
        </div>

        {/* Up and Down Buttons */}
        <div className="flex justify-between w-full mt-4">
          <button
            onClick={() => handleTrade("Up")}
            className="w-1/2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 mr-2"
          >
            Up
          </button>
          <button
            onClick={() => handleTrade("Down")}
            className="w-1/2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Down
          </button>
        </div>

        {/* Trade History */}
        <div className="w-full mt-6">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Trade History</h3>
          {tradeHistory.length === 0 ? (
            <p className="text-gray-500">No trades yet.</p>
          ) : (
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr>
                  <th className="border-b p-2">Type</th>
                  <th className="border-b p-2">Asset</th>
                  <th className="border-b p-2">Stake</th>
                  <th className="border-b p-2">Multiplier</th>
                  <th className="border-b p-2">Time</th>
                </tr>
              </thead>
              <tbody>
                {tradeHistory.map((trade, index) => (
                  <tr key={index}>
                    <td className="p-2">{trade.type}</td>
                    <td className="p-2">{trade.asset}</td>
                    <td className="p-2">{trade.stake}</td>
                    <td className="p-2">x{trade.multiplier}</td>
                    <td className="p-2">{trade.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Trading;
