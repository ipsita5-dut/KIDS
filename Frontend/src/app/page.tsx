import Hero from "./components/Hero";  // Assuming Hero is a component in the Home directory
import AboutUs from "./components/AboutUs";
import Services from "./components/Services";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Reviews from "./components/Review";

export default function Home() {
  return (
    <main>
      <NavBar />
      <Hero />
      <section id="about">
        <AboutUs />
      </section>
      
      <section id="services">
        <Services />
      </section>
      <section id="reviews">
      <Reviews/>
      </section>
      <Footer />
    </main>
  );
}
