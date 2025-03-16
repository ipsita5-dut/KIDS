"use client";
import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <motion.section
      className="flex flex-col items-center text-center py-20 px-8 min-h-[80vh] md:min-h-[90vh] w-full"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      {/* Heading with Staggered Animation */}
      <motion.h2
        className="text-6xl md:text-5xl font-bold text-[#1A1A2E] drop-shadow-md mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        About Us
      </motion.h2>

      {/* Paragraph with Staggered Animation */}
      <motion.p
        className="text-gray-800 text-2xl md:text-xl max-w-3xl mx-auto leading-relaxed px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
      >
        Welcome to <span className="font-semibold text-green-700 text-3xl">NutriCare+</span>, your AI-powered meal and nutrition assistant!  
        We are on a mission to make healthy eating effortless by providing personalized  
        meal plans, smart grocery lists, and AI-driven diet recommendations.  
        Whether you're managing a health condition, following a fitness goal, or just  
        looking for better meal choices, NutriCare+ adapts to your unique needs.  
      </motion.p>
    </motion.section>
  );
}
