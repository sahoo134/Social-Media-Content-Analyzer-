import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const refreshPage = () => window.location.reload();

  const activeClass = (path) =>
    location.pathname === path
      ? "bg-blue-600"
      : "bg-gray-700 hover:bg-gray-600";

  return (
    <nav className="w-full bg-gray-800 text-white px-6 py-4 shadow-md flex justify-between items-center">
      {/* App Name */}
      <h1 className="text-lg font-semibold tracking-wide">
        Social Media Content Analyzer
      </h1>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-4">
        <Link to="/" className={`px-4 py-2 rounded-md transition ${activeClass("/")}`}>
          Home
        </Link>

        <Link to="/about" className={`px-4 py-2 rounded-md transition ${activeClass("/about")}`}>
          About
        </Link>

        <button
          onClick={refreshPage}
          className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 transition"
        >
          Refresh
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-3xl"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="absolute top-16 right-4 bg-gray-800 shadow-lg rounded-lg p-4 flex flex-col gap-3 md:hidden w-40">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className={`px-4 py-2 rounded-md transition ${activeClass("/")}`}
          >
            Home
          </Link>

          <Link
            to="/about"
            onClick={() => setOpen(false)}
            className={`px-4 py-2 rounded-md transition ${activeClass("/about")}`}
          >
            About
          </Link>

          <button
            onClick={() => {
              refreshPage();
              setOpen(false);
            }}
            className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 transition"
          >
            Refresh
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
