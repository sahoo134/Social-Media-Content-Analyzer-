import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";   

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full bg-gray-900 text-white flex flex-col">

        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <div className="flex-grow flex justify-center items-start p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />   
      </div>
    </Router>
  );
}

export default App;
