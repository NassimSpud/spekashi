import React, { useEffect } from "react";

const Trading = () => {
  useEffect(() => {
    // Add the TradingView widget script
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      new window.TradingView.widget({
        container_id: "tradingview_widget",
        autosize: true,
        symbol: "NASDAQ:AAPL", // Replace with your preferred trading symbol
        interval: "D",
        timezone: "Etc/UTC",
        theme: "light", // Set theme to light
        style: "1",
        locale: "en",
        toolbar_bg: "#f9f9f9", // Light toolbar background
        enable_publishing: false,
        allow_symbol_change: true,
        save_image: false,
      });
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className="h-screen bg-white text-black flex items-center justify-center">
      <div
        id="tradingview_widget"
        style={{ width: "100%", height: "100%" }}
        className="rounded-lg shadow-md"
      />
    </div>
  );
};

export default Trading;
