// frontend/src/app/components/Home.tsx
import React from "react";
import NavBar from "./NavBar";
import Hero from "./Hero";
import AboutUs from "./AboutUs";
import Services from "./Services";
import Footer from "./Footer";
import Reviews from "./Review";
const Home = () => {
  return (
    <main>
      <NavBar />
      <Hero />
      <AboutUs />
      <Services />
      <Reviews/>
      <Footer />
    </main>
  );
};

export default Home;
