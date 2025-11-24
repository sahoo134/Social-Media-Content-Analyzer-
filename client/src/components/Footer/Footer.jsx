import React from "react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-800 text-gray-400 py-4 mt-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Brand & Text */}
        <p className="text-sm text-center md:text-left">
          © {new Date().getFullYear()} Social Media Content Analyzer. All rights reserved.
        </p>

        {/* Social Icons */}
        <div className="flex gap-4 text-xl">
          <a href="#" className="hover:text-white transition">
            <FaGithub />
          </a>
          <a href="#" className="hover:text-white transition">
            <FaTwitter />
          </a>
          <a href="#" className="hover:text-white transition">
            <FaLinkedin />
          </a>
        </div>

      </div>
    </footer>
  );
}
