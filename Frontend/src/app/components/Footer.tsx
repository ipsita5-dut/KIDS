import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className="relative bg-cover bg-center text-white p-10 md:p-16"
      style={{
        backgroundImage: "url('/images/footer.jpg')",
         // Add a suitable background image
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 flex flex-col items-center text-center space-y-6">
        {/* Footer Title */}
        <h2 className="text-2xl md:text-3xl font-bold">NutriCare+</h2>
        <p className="text-sm md:text-lg max-w-lg">
          Your AI-powered companion for personalized nutrition & healthy living.
        </p>

        {/* Social Media Links */}
        <div className="flex space-x-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF className="w-6 h-6 hover:text-blue-500 transition" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="w-6 h-6 hover:text-blue-400 transition" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="w-6 h-6 hover:text-pink-500 transition" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="w-6 h-6 hover:text-blue-700 transition" />
          </a>
        </div>

        {/* Contact Information */}
        <div className="text-sm md:text-lg">
          <p>Email: <a href="mailto:support@nutricare.com" className="hover:underline">support@nutricare.com</a></p>
          <p>Phone: <a href="tel:+1234567890" className="hover:underline">+1 (234) 567-890</a></p>
        </div>

        {/* Copyright */}
        <p className="text-xs md:text-sm opacity-80">
          &copy; {new Date().getFullYear()} NutriCare+. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
