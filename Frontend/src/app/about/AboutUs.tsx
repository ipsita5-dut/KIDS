"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function AboutUs() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  // Data for sections (to avoid repetition)
  const sections = [
    {
      title: "The Vision Behind NutriCare+",
      description:
        "We envisioned a smart, intuitive, and science-backed platform that could personalize meal plans based on dietary needs, fitness goals, and health conditions. Analyze food images to provide instant nutrition insights. Suggest grocery lists that align with meal preferences and budgets. Make healthy eating enjoyable and accessible for all.",
      image: "/images/our-story.png",
    },
    {
      title: "Meet Our Team",
      description:
        "Our diverse and talented team is the backbone of NutriCare. From AI researchers to nutritionists, we work together to bring innovative solutions that empower individuals to take control of their health.",
      image: "/images/our-team.png",
    },
    {
      title: "Our Core Values",
      description:
        "We uphold integrity, innovation, and excellence in all our endeavors. Our values guide the way we work, build relationships, and develop solutions that truly make an impact.",
      image: "/images/core-values.png",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-pink-200 to-blue-300 min-h-screen w-screen">
      <NavBar />
      
      {/* Header Section */}
      <div className="w-screen px-6 py-32 text-center flex flex-col items-center">
        <h1 className="text-5xl font-bold text-black-900 mb-2">About Us</h1>
        <p className="text-2xl text-gray-700  max-w-screen-lg mt-10">
          🌿 Welcome to NutriCare – Your Smart Nutrition Companion. At NutriCare, we believe that good health starts with smart nutrition. Our mission is to make personalized nutrition accessible, simple, and effective using the latest AI-powered solutions.
        </p>
      </div>

      {/* Dynamic Zig-Zag Sections */}
      {sections.map((section, index) => (
        <div 
          key={index} 
          className={`w-screen px-6 py-16 flex flex-col md:flex-row items-center gap-12 text-center md:text-left ${
            index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
          }`}
        >
          {/* Text Content */}
          <div className="md:w-1/2 flex flex-col items-center md:items-start ml-30">
            <h2 className="text-4xl font-bold text-black-900 mb-5">{section.title}</h2>
            <p className="text-lg text-gray-700 mt-4 max-w-lg">{section.description}</p>
          </div>

          {/* Image */}
          <div className="md:w-1/2 flex justify-center">
            <Image
              src={section.image}
              alt={section.title}
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      ))}

      <Footer />
    </div>
  );
}
