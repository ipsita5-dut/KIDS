"use client";
import { useState, useContext, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import Link from "next/link";
export default function Login() {
  const { login } = useContext(AuthContext) ?? {};
  const [fadeIn, setFadeIn] = useState<boolean>(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error message when typing
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("email", data.email);
        login?.(data.token);
        setSuccessMessage("Login successful!");
        setTimeout(() => router.push("/home"), 1500);
      } else {
        setError(data.message || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-blue-300">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: fadeIn ? 1 : 0, y: fadeIn ? 0 : 50 }}
        transition={{ duration: 0.8 }}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center"
      >
        <h2 className="text-4xl font-bold text-gray-900">Login</h2>
        <p className="text-gray-700 mt-2">Sign in to your account</p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <motion.input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          />
          <motion.input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          />
          <motion.button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
        <p className="text-gray-700 mt-4">
          Don't have an account? {" "}
          <Link href="/signup" className="text-blue font-semibold hover:text-gray-600">Sign Up</Link>
            
          
        </p>
      </motion.div>
    </div>
  );
}
