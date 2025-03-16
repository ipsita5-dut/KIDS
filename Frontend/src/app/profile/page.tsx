"use client";
import "../globals.css";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import NavBar from "../components/NavBar"; // Import NavBar
import Footer from "../components/Footer"; // Import Footer

interface UserProfile {
  username: string;
  email: string;
  profileId?: string;
  age?: number;
  weight?: number;
  height?: number;
  systolicBP?: number;
  diastolicBP?: number;
  glucose?: string;
  geneticRiskFactor?: "Yes" | "No";
  allergies?: string;
  dailySteps?: number;
}

export default function Profile() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<UserProfile>>({});

  useEffect(() => {
    const fetchUserProfile = async () => {
      const email = localStorage.getItem("email");
      if (!email) {
        setError("No email found in localStorage.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/profile?email=${email}`);
        if (!response.ok) throw new Error("Failed to fetch user data");
        const data = await response.json();
        setUser({ ...data, profileId: "12345XYZ" }); // Mock Profile ID
        setFormData(data);
      } catch (err) {
        setError("Error fetching user profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ["age", "weight", "height", "dailySteps", "systolicBP", "diastolicBP"].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleUpdate = async () => {
    if (!user?.email) return;

    try {
      const response = await fetch("http://localhost:5000/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, ...formData }),
      });

      if (!response.ok) throw new Error("Failed to update user profile");
      const updatedData = await response.json();
      setUser(updatedData);
      alert("Profile updated successfully!");
    } catch (err) {
      alert("Error updating profile.");
    }
  };

  if (loading) return <p className="text-center text-gray-600 mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <>
      {/* NavBar at the top */}
      <NavBar />

      {/* Main Profile Section */}
      <motion.div
        className="max-w-5xl mx-auto mt-18 flex flex-col md:flex-row gap-10 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Left Section - User Info */}
        <motion.div
          className="bg-gray-100 p-8 rounded-lg shadow-lg w-full md:w-1/3 text-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-gray-800">User Information</h2>

          <div className="w-full mt-4 space-y-3">
            <div>
              <label className="block text-gray-700 font-medium">Username:</label>
              <input
                type="text"
                value={user?.username || ""}
                disabled
                className="border p-3 w-full rounded bg-gray-200 text-gray-600 text-center"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Email:</label>
              <input
                type="text"
                value={user?.email || ""}
                disabled
                className="border p-3 w-full rounded bg-gray-200 text-gray-600 text-center"
              />
            </div>
          </div>
        </motion.div>

        {/* Right Section - Editable Profile */}
        <motion.div
          className="bg-white p-8 rounded-lg shadow-lg w-full md:w-2/3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h2>

          <div className="grid grid-cols-2 gap-6">
            {[
              { label: "Age", name: "age" },
              { label: "Weight (kg)", name: "weight" },
              { label: "Height (cm)", name: "height" },
              { label: "Systolic BP", name: "systolicBP" },
              { label: "Diastolic BP", name: "diastolicBP" },
              { label: "Daily Steps", name: "dailySteps" },
            ].map(({ label, name }) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <label className="block text-gray-700 font-medium">{label}:</label>
                <input
                  type="number"
                  name={name}
                  value={formData[name as keyof UserProfile] || ""}
                  onChange={handleChange}
                  className="border p-3 w-full rounded focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </motion.div>
            ))}
          </div>

          {/* Additional Fields */}
          <div className="mt-4">
            <label className="block text-gray-700 font-medium">Blood Glucose Level:</label>
            <input type="text" name="glucose" value={formData.glucose || ""} onChange={handleChange} className="border p-3 w-full rounded" />
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 font-medium">Genetic Risk Factor:</label>
            <select name="geneticRiskFactor" value={formData.geneticRiskFactor || "No"} onChange={handleChange} className="border p-3 w-full rounded">
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Update Button */}
          <motion.button
            onClick={handleUpdate}
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Update Profile
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Footer at the bottom */}
      <Footer />
    </>
  );
}
