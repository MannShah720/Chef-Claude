// Imports
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const { HfInference } = require("@huggingface/inference");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Allows resource sharing if frontend runs on different port
app.use(cors());
app.use(express.json());

// Initialize Hugging Face API client
const hf = new HfInference(process.env.HF_API_KEY);

app.use(express.static(path.join(__dirname, "dist")));

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients and suggests a recipe...
`;

// POST endpoint to handle recipe requests from the frontend
app.post("/api/recipe", async (req, res) => {

  // Extract & validate ingredients array
  try {
    const { ingredients } = req.body;
    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({ error: "Missing or invalid ingredients." });
    }

    const prompt = `I have ${ingredients.join(", ")}. Please give me a recipe!`;

    // Chat Completion
    const response = await hf.chatCompletion({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt },
      ],
      max_tokens: 1024,
    });

    // Extract the recipe content from the AI response
    const recipe = response.choices?.[0]?.message?.content;

    // Error handling if no recipe returned
    if (!recipe) {
      return res.status(502).json({ error: "Empty response from Hugging Face." });
    }

    // Send the recipe back to the client as JSON
    res.status(200).json({ recipe });

  } catch (err) {
    console.error("API error:", err);
    res.status(500).json({ error: err.message || "Server error." });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Logs message if server starts 
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
