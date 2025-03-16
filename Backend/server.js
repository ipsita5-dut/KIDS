const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");  // Import authentication routes
const bodyParser = require('body-parser');
const { OpenAI} = require('openai'); // Ensure this is correct
const recipeRoutes = require("./routes/recipeRoutes"); // New route for Flask API

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use("/uploads", express.static("uploads"));
const uri = process.env.MONGODB_URI;
console.log("MongoDB URI:", uri);  // This will help you verify if the URI is loaded properly

if (!uri) {
  console.error("MongoDB URI is not set in environment variables.");
  process.exit(1);  // Exit the process if the URI is not found
}
// Database Connection
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Database Connection Error:", error);
  });

app.use("/api", authRoutes);  // All authentication routes will be prefixed with "/api"
app.use("/api/recipes", recipeRoutes);  // Register recipe routes

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  
app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      store: true,
      messages: [{ role: "user", content: userMessage }],
    });

    const botResponse =  completion.choices[0].message
    res.json({ response: botResponse.content });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error communicating with OpenAI API');
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
