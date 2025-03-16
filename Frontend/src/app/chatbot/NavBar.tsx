"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { AuthContext } from "../context/AuthContext";
import { MessageCircle, ChevronDown } from "lucide-react"; // Icons

export default function NavBar() {
  const { isAuthenticated, logout } = useContext(AuthContext) ?? {};
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex justify-between items-center p-5 transition-all z-50 backdrop-blur-lg 
      ${scrolled ? "bg-white/50 shadow-md" : "bg-white/30"}`}
    >
      {/* Logo Section */}
      <div className="flex items-center space-x-3">
        <img src="/images/logo.png" alt="Logo" className="w-15 h-12" />
        <h1 className="text-lg font-bold text-green-800">NUTRICARE</h1>
      </div>

      {/* Navigation Links (Hidden on Small Screens) */}
      <ul className="hidden md:flex space-x-5">
        <li><a href="/home" className="text-black hover:text-gray-600">Home</a></li>
        <li><a href="/about" className="text-black hover:text-gray-600">About Us</a></li>
        <li><a href="/#services" className="text-black hover:text-gray-600">Services</a></li>
        <li><a href="/contact" className="text-black hover:text-gray-600">Contact Us</a></li>
      </ul>

      {/* Right-Side Buttons (Chatbot & Auth) */}
      <div className="flex items-center space-x-4 relative">
        {/* Chatbot Button */}
        <Link href="/chatbot">
                  AI Chatbot
        <button
          onClick={() => console.log("Chatbot Opened")} // Replace with chatbot logic
          className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition"
          title="Open Chatbot"
        >
          <MessageCircle size={24} />
        </button>
        </Link>
        {/* Authentication Dropdown */}
        {isAuthenticated ? (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="bg-gray-200 text-black px-4 py-2 rounded flex items-center hover:bg-gray-300 transition"
            >
              My Account <ChevronDown size={20} className="ml-2" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                <a
                  href="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  My Account
                </a>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <a href="/login" className="text-black hover:text-gray-600">Log In</a>
            <a href="/signup" className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-gray-700 transition">
              Sign Up
            </a>
          </>
        )}
      </div>
    </nav>
  );
}
