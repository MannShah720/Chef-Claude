const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { HfInference } = require("@huggingface/inference");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const hf = new HfInference(process.env.HF_API_KEY);

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients and suggests a recipe...
`;

app.post("/api/recipe", async (req, res) => {
  try {
    const { ingredients } = req.body;
    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({ error: "Missing or invalid ingredients." });
    }

    const prompt = `I have ${ingredients.join(", ")}. Please give me a recipe!`;

    const response = await hf.chatCompletion({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt },
      ],
      max_tokens: 1024,
    });

    const recipe = response.choices?.[0]?.message?.content;
    if (!recipe) {
      return res.status(502).json({ error: "Empty response from Hugging Face." });
    }

    res.status(200).json({ recipe });
  } catch (err) {
    console.error("API error:", err);
    res.status(500).json({ error: err.message || "Server error." });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
