// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation"; // For redirection after signup
// import { motion } from "framer-motion";

// export default function Signup() {
//   const [fadeIn, setFadeIn] = useState(false);
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const router = useRouter();

//   useEffect(() => {
//     setFadeIn(true);
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault(); // Prevents default form submission behavior

//     try {
//       const response = await fetch("http://localhost:5000/api/signup", {
//         method: "POST", // Use POST to send form data
//         headers: {
//           "Content-Type": "application/json", // Make sure to use JSON
//         },
//         body: JSON.stringify(formData), // Send form data in the request body
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setSuccessMessage("Signup successful!");
//         // Redirect after 2 seconds to give user time to see the success message
//         setTimeout(() => {
//           router.push("/home"); // Redirect to the Hero page
//         }, 2000);
//       } else {
//         setError(data.message || "Signup failed. Please try again.");
//       }
//     } catch (error) {
//       setError("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <div
//       className="flex items-center justify-center min-h-screen bg-gray-100"
//       style={{
//         backgroundImage: `url('https://images.unsplash.com/photo-1594323713852-9626155bfd37?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
//         backgroundSize: "50% 50%",
//         backgroundPosition: "repeat",
//       }}
//     >
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: fadeIn ? 1 : 0, y: fadeIn ? 0 : 50 }}
//         transition={{ duration: 0.8 }}
//         className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center"
//       >
//         <h2 className="text-3xl font-bold text-gray-800">Sign Up</h2>
//         <p className="text-gray-600 mt-2">Create your account</p>
//         <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
//           <motion.input
//             type="text"
//             name="username"
//             placeholder="Full Name"
//             value={formData.username}
//             onChange={handleChange}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.2 }}
//           />
//           <motion.input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.4 }}
//           />
//           <motion.input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.6 }}
//           />
//           <motion.button
//             type="submit"
//             className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             Sign Up
//           </motion.button>
//         </form>
//         {error && <p className="text-red-500 mt-4">{error}</p>}
//         {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
//         <p className="text-gray-600 mt-4">
//           Already have an account?{" "}
//           <a href="/login" className="text-pink-500 font-semibold">
//             Log in
//           </a>
//         </p>
//       </motion.div>
//     </div>
//   );
// }
"use client";
import { useEffect, useState, ChangeEvent, FormEvent} from "react";
import { useRouter } from "next/navigation"; // For redirection after signup
import { motion } from "framer-motion";
import Link from "next/link";
export default function Signup() {
  const [fadeIn, setFadeIn] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Prevents default form submission behavior

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST", // Use POST to send form data
        headers: {
          "Content-Type": "application/json", // Make sure to use JSON
        },
        body: JSON.stringify(formData), // Send form data in the request body
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Signup successful!");
        // Redirect after 2 seconds to give user time to see the success message
        setTimeout(() => {
          router.push("/login"); // Redirect to the Hero page
        }, 2000);
      } else {
        setError(data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-blue-300"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: fadeIn ? 1 : 0, y: fadeIn ? 0 : 50 }}
        transition={{ duration: 0.8 }}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm text-center"
      >
        <h2 className="text-4xl font-bold text-gray-900">Sign Up</h2>
        <p className="text-gray-700 mt-2">Create your account</p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <motion.input
            type="text"
            name="username"
            placeholder="Full Name"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 border border-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          />
          <motion.input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
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
            transition={{ delay: 0.6 }}
          />
          <motion.button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign Up
          </motion.button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
        <p className="text-gray-700 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-blue font-semibold hover:font-bold">Log in</Link>
            
          
        </p>
      </motion.div>
    </div>
  );
}