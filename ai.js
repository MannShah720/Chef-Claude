// The main function that allows the AI to take in ingredients and generate a recipe

export async function getRecipeFromMistral(ingredientsArr) {
  if (!Array.isArray(ingredientsArr) || ingredientsArr.length === 0) {
    throw new Error("You must provide at least one ingredient.");
  }

  // Make a POST request to the backend server at /api/recipe
  try {
    const res = await fetch("http://localhost:5000/api/recipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients: ingredientsArr }),
    });

    // Error handling if the server response is not OK
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Server error: ${errText}`);
    }

    // Parse the successful JSON response and extract the 'recipe' field
    const { recipe } = await res.json();
    return recipe;
  } catch (err) {
    // Log & re-throw if error occurs
    console.error("getRecipeFromMistral error:", err);
    throw err;
  }
}
