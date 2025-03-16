const express = require("express");
const axios = require("axios");

const router = express.Router();

// Route to send only disease info to Flask for prediction
router.post("/predict", async (req, res) => {
  try {
    const { disease, allergies, dietary_habits } = req.body;

    if (!disease || !allergies || !dietary_habits) {
      return res.status(400).json({ error: "Disease, allergies, and dietary_habits fields are required" });
    }

    const data = {
      disease,
      allergies,
      dietary_habits
    };
    // Send request to Flask server with only disease
    const response = await axios.post("http://localhost:8000/predict", data);

    res.json(response.data); // Forward response to frontend
  } catch (error) {
    console.error("Error calling Flask API:", error.message);
    res.status(500).json({ error: "Flask server error" });
  }
});

module.exports = router;
