import React from "react";

const LandingPage = () => {
  return (
    <div
      className="bg-[#0d0d0f] text-white min-h-screen flex flex-col justify-center items-center pt-16"
    >
      <h1 className="text-red-500 font-bold text-lg uppercase tracking-wide">
        Best Deriv/Binary Trading App
      </h1>
      <h2 className="text-6xl font-extrabold text-center mt-4 leading-tight">
        Get an Edge
        <br />
        <span className="text-white">On Deriv Markets</span>
      </h2>
      <p className="text-gray-400 text-lg text-center mt-6 max-w-2xl">
        Spekashi revolutionizes trading with its free app, offering advanced
        analysis tools and cutting-edge binary/deriv trading bots. Empowering
        users to trade synthetic indices with ease, it's a game-changer in the
        financial world.
      </p>
    </div>
  );
};

export default LandingPage;
