// "use client";
// import { motion } from "framer-motion";
// import { useState } from "react";


// export default function RecipeGenerator() {
//   const [healthCondition, setHealthCondition] = useState("");
//   const [dietPreference, setDietPreference] = useState("");
//   const [allergies, setAllergies] = useState("");

//   const handleSubmit = () => {
//     // Handle form submission
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center font-sans">
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg"
//       >
//         <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
//           AI Recipe Generator
//         </h1>

//         {/* Disease Selection */}
//         <div className="mb-6">
//           <label className="block text-gray-700 text-sm font-medium mb-2">
//             Select Health Condition
//           </label>
//           <select
//             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
//             value={healthCondition}
//             onChange={(e) => setHealthCondition(e.target.value)}
//           >
//             <option value="">Select Disease</option>
//             <option value="Diabetes">Diabetes</option>
//             <option value="Heart Disease">Heart Disease</option>
//             <option value="PCOS">PCOS</option>
//           </select>
//         </div>

//         {/* Diet Preference */}
//         <div className="mb-6">
//           <label className="block text-gray-700 text-sm font-medium mb-2">
//             Diet Preference
//           </label>
//           <select
//             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
//             value={dietPreference}
//             onChange={(e) => setDietPreference(e.target.value)}
//           >
//             <option value="">Select Diet</option>
//             <option value="Vegan">Vegan</option>
//             <option value="Keto">Keto</option>
//             <option value="Low-Carb">Low-Carb</option>
//           </select>
//         </div>

//         {/* Food Allergies */}
//         <div className="mb-6">
//           <label className="block text-gray-700 text-sm font-medium mb-2">
//             Food Allergies
//           </label>
//           <select
//             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
//             value={allergies}
//             onChange={(e) => setAllergies(e.target.value)}
//           >
//             <option value="">Select Allergy</option>
//             <option value="Nuts">Nuts</option>
//             <option value="Gluten">Gluten</option>
//             <option value="Dairy">Dairy</option>
//           </select>
//         </div>

//         {/* Submit Button */}
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={handleSubmit}
//           className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white p-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all"
//         >
//           Get Food Recommendations
//         </motion.button>
//       </motion.div>
//     </div>
//   );
// }
"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";

interface DietPlan {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  meal_plan: {
    Breakfast: string[];
    "Morning Snack": string[];
    Lunch: string[];
    "Afternoon Snack": string[];
    Snack: string[];
    "Evening Snack": string[];
    Dinner: string[];
  };
}

export default function RecipeGenerator() {
  const [healthCondition, setHealthCondition] = useState("");
  const [dietPreference, setDietPreference] = useState("");
  const [allergies, setAllergies] = useState("");
  const [dietPlan, setDietPlan] = useState<DietPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [agree, setAgree] = useState(false); // Checkbox state

  
  const handleSubmit = async () => {
    if (!healthCondition || !dietPreference || !allergies) {
      setError("Please fill in all the fields before submitting.");
      return;
    }

    if (!agree) {
      setError("Please agree to the terms before proceeding.");
      return;
    }
  
    setLoading(true);
    setError("");
    setDietPlan(null);
  
    try {
      // Logging the request payload to make sure it's structured correctly
      console.log({
        disease: healthCondition,
        dietary_habits: dietPreference,
        allergies: allergies,
      });
  
      // Call Node.js API on port 5000
      const response = await axios.post("http://localhost:5000/api/recipes/predict", {
        disease: healthCondition,
        dietary_habits: dietPreference,
        allergies: allergies,
      });
  
      setDietPlan(response.data);
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
<div className="min-h-screen bg-gradient-to-br from-green-200 to-green-400 p-6 flex flex-col items-center font-sans">
<motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white p-8 rounded-3xl shadow-2xl border border-gray-200"      >
<h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">🍏 Health Care Monitor
        </h1>

        {/* Disease Selection */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Select Health Condition
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            value={healthCondition}
            onChange={(e) => setHealthCondition(e.target.value)}
          >
            <option value="">Select Disease</option>
            <option value="Diabetes">Diabetes</option>
            <option value="Heart Disease">Heart Disease</option>
            <option value="PCOS">PCOS</option>
          </select>
        </div>
        {/* Diet Preference */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Diet Preference
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            value={dietPreference}
            onChange={(e) => setDietPreference(e.target.value)}
          >
            <option value="">Select Diet</option>
            <option value="Vegan">Vegan</option>
            <option value="Keto">Keto</option>
            <option value="Low-Carb">Low-Carb</option>
          </select>
        </div>

        {/* Food Allergies */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Food Allergies
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
          >
            <option value="">Select Allergy</option>
            <option value="Nuts">Nuts</option>
            <option value="Gluten">Gluten</option>
            <option value="Dairy">Dairy</option>
          </select>
        </div>
        
        {/* Checkbox - Centered */}
        <div className="flex justify-center items-center mb-6">
          <input
            type="checkbox"
            id="agree"
            className="mr-2 w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-2 focus:ring-green-500"
            checked={agree}
            onChange={() => setAgree(!agree)}
          />
          <label htmlFor="agree" className="text-gray-700 text-sm">
            I agree to the terms and conditions
          </label>
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          className="w-full bg-green-500 text-white p-3 rounded-xl font-semibold shadow-md hover:bg-green-600 transition-all"        >
          {loading ? "Generating..." : "Get Food Recommendations"}
        </motion.button>

        {/* Error Message */}
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

        {/* Generated Meal Plan */}
        {dietPlan && (
          <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }} 
          className="mt-6 p-6 bg-white rounded-2xl shadow-lg w-full"
        >
          {/* Nutritional Information */}
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Nutritional Information
            </h3>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-2 gap-4 text-center bg-gray-100 p-4 rounded-lg shadow-md"
            >
              <p><strong>Calories:</strong> {dietPlan.calories.toFixed(2)}</p>
              <p><strong>Protein:</strong> {dietPlan.protein.toFixed(2)} g</p>
              <p><strong>Carbs:</strong> {dietPlan.carbs.toFixed(2)} g</p>
              <p><strong>Fat:</strong> {dietPlan.fat.toFixed(2)} g</p>
            </motion.div>

            {/* Meal Plan */}
            <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-4 text-center">
              Recommended Meal Plan
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Object.entries(dietPlan.meal_plan).map(([mealTime, items], index) => (
                <motion.div
                  key={mealTime}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="p-4 border border-gray-300 rounded-lg shadow-md bg-gray-50"
                >
                  <h4 className="text-lg font-semibold text-green-600 mb-2 text-center">
                    {mealTime}
                  </h4>
                  <ul className="list-disc list-inside text-gray-700">
                    {items.map((item, i) => (
                      <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                      >
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}






