document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("search-btn");
    const ingredientInput = document.getElementById("ingredient-input");
    const cuisineFilter = document.getElementById("cuisine-filter");
    const dietFilter = document.getElementById("diet-filter");
    const recipesContainer = document.getElementById("recipes");
    const favoritesContainer = document.getElementById("favorite-recipes");
    const historyContainer = document.getElementById("search-history");
    const trendingContainer = document.getElementById("trending-recipes");
    const nutritionInput = document.getElementById("nutrition-input");
    const calculateNutritionBtn = document.getElementById("calculate-nutrition");
    const nutritionResults = document.getElementById("nutrition-results");
  
    const searchHistory = [];
    const favoriteRecipes = [];
  
    // Mock trending recipes
    const trendingRecipes = [
      { title: "Spaghetti Carbonara", time: "25 mins", instructions: "Cook pasta and mix with sauce." },
      { title: "Tacos al Pastor", time: "30 mins", instructions: "Prepare pork and serve in tortillas." }
    ];
  
    displayTrendingRecipes(trendingRecipes);
  
    // Search Recipes
    searchBtn.addEventListener("click", async () => {
      const ingredients = ingredientInput.value.trim();
      const cuisine = cuisineFilter.value;
      const diet = dietFilter.value;
  
      if (!ingredients) {
        alert("Please enter some ingredients.");
        return;
      }
  
      searchHistory.push(ingredients);
      updateSearchHistory();
  
      const recipes = await fetchRecipes(ingredients, cuisine, diet);
      displayRecipes(recipes);
    });
  
    // Fetch Recipes
    async function fetchRecipes(ingredients, cuisine, diet) {
      // Placeholder function: Replace with real API call
      return [
        { title: "Garlic Chicken", time: "30 mins", instructions: "Bake at 375°F for 25 mins." },
        { title: "Vegetable Stir-fry", time: "15 mins", instructions: "Cook in a wok for 10 mins." }
      ].filter(recipe =>
        (!cuisine || recipe.title.toLowerCase().includes(cuisine)) &&
        (!diet || recipe.title.toLowerCase().includes(diet))
      );
    }
  
    // Display Recipes
    function displayRecipes(recipes) {
      recipesContainer.innerHTML = recipes.map(recipe => `
        <div class="recipe-card">
          <h3>${recipe.title}</h3>
          <p><strong>Time:</strong> ${recipe.time}</p>
          <button class="save-btn">Save to Favorites</button>
        </div>
      `).join("");
  
      document.querySelectorAll(".save-btn").forEach((btn, index) => {
        btn.addEventListener("click", () => saveToFavorites(recipes[index]));
      });
    }
  
    // Display Trending Recipes
    function displayTrendingRecipes(recipes) {
      trendingContainer.innerHTML = recipes.map(recipe => `
        <div class="recipe-card">
          <h3>${recipe.title}</h3>
          <p><strong>Time:</strong> ${recipe.time}</p>
        </div>
      `).join("");
    }
  
    // Save to Favorites
    function saveToFavorites(recipe) {
      favoriteRecipes.push(recipe);
      updateFavorites();
    }
  
    // Update Favorites
    function updateFavorites() {
      favoritesContainer.innerHTML = favoriteRecipes.map(recipe => `
        <div class="recipe-card">
          <h3>${recipe.title}</h3>
          
          <p><strong>Time:</strong> ${recipe.time}</p>
        </div>
      `).join("");
    }
  
    // Update Search History
    function updateSearchHistory() {
      historyContainer.innerHTML = searchHistory.map(item => `<li>${item}</li>`).join("");
    }
  
    // Calculate Nutrition
    calculateNutritionBtn.addEventListener("click", () => {
      const ingredients = nutritionInput.value.trim();
      if (!ingredients) {
        alert("Please enter some ingredients.");
        return;
      }
  
      // Placeholder calculation
      const calories = Math.floor(Math.random() * 500) + 100; // Random calorie count
      nutritionResults.textContent = `Total Calories: ${calories} kcal`;
    });
  });
  