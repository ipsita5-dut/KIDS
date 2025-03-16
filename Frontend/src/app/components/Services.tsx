"use client";
import "../globals.css";
import { motion } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

// Service Data
const services = [
  {
    title: "AI-Powered Diet Chatbot",
    image: "/Service1.webp",
    link: "/chatbot",
  },
  {
    title: "Smart Diet Planner for Diseases",
    image: "/Pic2.jpg",
    link: "/recipe",
  },
  // {
  //   title: "Food Image Recognition",
  //   image: "/Pic3.avif",
  //   link: "/services/food-recognition",
  // },
  // {
  //   title: "Budget-Friendly Meal Suggestions",
  //   image: "/Pic4.jpg",
  //   link: "/services/budget-meals",
  // },
];

export default function Services() {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.2 });

  return (
    <div 
      ref={ref} 
      className="relative flex flex-col items-center p-8 text-[#1A1A2E] min-h-[90vh] md:min-h-[100vh] w-full"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: "url('/images/background-services.jpg')",opacity:1 }}
      ></div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content Wrapper */}
      <div className="relative z-10 text-center w-full max-w-6xl">
        {/* Heading */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-white mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          Our Services
        </motion.h1>

        <p className="text-lg md:text-xl text-gray-200 mt-4">
          Discover AI-powered solutions designed to enhance your health and well-being.
        </p>

        {/* Service Cards */}
        <div className="flex flex-wrap justify-center gap-8 mt-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="w-full md:w-1/2 lg:w-1/3 bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:shadow-2xl hover:-translate-y-2 relative z-10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{
                opacity: inView ? 1 : 0,
                scale: inView ? 1 : 0.8,
                y: inView ? 0 : 50,
              }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }} // Disappears when scrolling up
              transition={{ delay: index * 0.2, duration: 0.6, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.3 }} // Triggers animation on scroll in/out
            >
              <div className="relative h-52 w-full">
                <Image src={service.image} alt={service.title} layout="fill" objectFit="cover" />
              </div>
              <div className="p-6 text-center">
                <h2 className="text-xl font-semibold">{service.title}</h2>
                <Link href={service.link}>
                  <button className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">
                    Explore
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
