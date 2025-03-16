"use client";
import "../globals.css";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { AuthContext } from "../context/AuthContext";
import { MessageCircle, ChevronDown, Sun, Moon } from "lucide-react"; // Icons

export default function NavBar() {
  const { isAuthenticated, logout } = useContext(AuthContext) ?? {};
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex justify-between items-center p-5 transition-all z-50 backdrop-blur-lg
        ${scrolled ? "bg-white/50 shadow-md dark:bg-black/60" : "bg-white/30 dark:bg-black/30"}
      `}
    >
      {/* Logo Section */}
      <div className="flex items-center space-x-3">
        <img src="/images/logo.png" alt="Logo" className="w-15 h-12" />
        <h1 className="text-lg font-bold text-green-800 dark:text-green-400">NUTRICARE</h1>
      </div>

      {/* Navigation Links (Hidden on Small Screens) */}
      <ul className="hidden md:flex space-x-5">
        <li><Link href="/home" className="text-black hover:text-gray-600 dark:text-white dark:hover:text-gray-400">Home</Link></li>
        <li><Link href="/about" className="text-black hover:text-gray-600 dark:text-white dark:hover:text-gray-400">About Us</Link></li>
        <li><Link href="/#services" className="text-black hover:text-gray-600 dark:text-white dark:hover:text-gray-400">Services</Link></li>
        <li><Link href="/contact" className="text-black hover:text-gray-600 dark:text-white dark:hover:text-gray-400">Contact Us</Link></li>
      </ul>

      {/* Right-Side Buttons (Chatbot & Auth) */}
      <div className="flex items-center space-x-4 relative">
        {/* Chatbot Button */}
        <a href="/chatbot">
          <button
            onClick={() => console.log("Chatbot Opened")} // Replace with chatbot logic
            className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition"
            title="Open Chatbot"
          >
            <MessageCircle size={24} />
          </button>
        </a>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-full bg-gray-200 text-black hover:bg-gray-300 dark:bg-gray-700 dark:text-white hover:dark:bg-gray-600 transition"
        >
          {isDarkMode ? (
            <Sun size={24} />
          ) : (
            <Moon size={24} />
          )}
        </button>

        {/* Authentication Dropdown */}
        {isAuthenticated ? (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="bg-gray-200 text-black px-4 py-2 rounded flex items-center hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition"
            >
              My Account <ChevronDown size={20} className="ml-2" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg dark:bg-gray-800 dark:border-gray-700">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600"
                >
                  My Account
                </Link>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link href="/login" className="text-black hover:text-gray-600 dark:text-white dark:hover:text-gray-400">Log In</Link>
            <Link href="/signup" className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-gray-700 dark:bg-blue-500 dark:hover:bg-blue-400 transition">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
