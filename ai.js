export async function getRecipeFromMistral(ingredientsArr) {
  if (!Array.isArray(ingredientsArr) || ingredientsArr.length === 0) {
    throw new Error("You must provide at least one ingredient.");
  }

  try {
    const res = await fetch("http://localhost:5000/api/recipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients: ingredientsArr }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Server error: ${errText}`);
    }

    const { recipe } = await res.json();
    return recipe;
  } catch (err) {
    console.error("getRecipeFromMistral error:", err);
    throw err;
  }
}
