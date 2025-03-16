"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import "../globals.css";

// Client Reviews Data
const reviews = [
  {
    name: "Sangeeta Dey",
    image: "/images/client1.jpg",
    review:
      "\"NutriCare+ has completely changed the way I plan my meals. The AI-powered recommendations are spot-on, and I love how easy it is to track my nutrition!c\"",
  },
  {
    name: "Maheep Singh",
    image: "/images/client2.jpg",
    review:
      "\"As a fitness enthusiast, I needed something tailored to my dietary needs. NutriCare+ makes healthy eating effortless and keeps me on track with my fitness goals.\"",
  },
  {
    name: "Ishita Roy",
    image: "/images/client3.jpg",
    review:
      "\"The food image recognition feature is amazing! I just take a picture of my meal, and NutriCare+ gives me the nutritional breakdown instantly.\"",
  },
];

export default function Reviews() {
  return (
    <motion.section
      className="flex flex-col items-center text-center py-24 px-8 min-h-screen bg-gray-10"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: false, amount: 0.3 }} // Trigger animation when 30% of section is in view
    >
      {/* Heading */}
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-[#1A1A2E] drop-shadow-md mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        What Our Clients Say
      </motion.h2>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl w-full">
        {reviews.map((client, index) => (
          <motion.div
            key={index}
            className="bg-white p-8 rounded-2xl shadow-lg w-80 md:w-96 flex flex-col items-center min-h-[320px] transition transform hover:scale-105 hover:shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }} // Slide out on scrolling up
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: false, amount: 0.3 }} // Animates each time it enters/exits view
          >
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-green-500">
              <Image
                src={client.image}
                alt={client.name}
                width={96}
                height={96}
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <h3 className="text-xl font-semibold text-green-600 mt-4">
              {client.name}
            </h3>
            <p className="text-gray-700 mt-3 leading-relaxed text-center text-base">
              {client.review}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
