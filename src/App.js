import React from 'react';
import Navbar from './components/Navbar';
import './index.css'; // Tailwind styles

const App = () => {
  return (
    <div>
      <Navbar />
      <main className="p-4">
        <h1 className="text-3xl font-bold">Welcome to the React Tailwind Navbar App!</h1>
      </main>
    </div>
  );
};

export default App;
