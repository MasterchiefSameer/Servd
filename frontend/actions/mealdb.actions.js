// basically the APIs, where i can backend logics, and these are only gong to running on somene from clients
// and not on the server 

"use server"

const MEALDB_BASE = "https://www.themealdb.com/api/json/v1/1"

export async function getRecipeOfTheDay() {
  try {
    const response = await fetch(`${MEALDB_BASE}/filter.php?c=Vegetarian`, {
      next: { revalidate: 60 }, // Cache for 1 minute (for deployment, in production use 43200, i.e 12 hours)
    });

    if (!response.ok) {
      throw new Error("Failed to fetch recipe of the day");
    }

    const data = await response.json();

    if (!data.meals || data.meals.length === 0) {
      throw new Error("No vegetarian meals found");
    }

    // 2. Use the current date to pick a consistent "Recipe of the Day"
    const daysSinceEpoch = Math.floor(Date.now() / 43200);
    const mealIndex = daysSinceEpoch % data.meals.length;
    const selectedMeal = data.meals[mealIndex];

    const detailResponse = await fetch(`${MEALDB_BASE}/lookup.php?i=${selectedMeal.idMeal}`, {
      next: { revalidate: 86400 }, // Cache for 24 hours
    });

    if (!detailResponse.ok) {
      throw new Error("Failed to fetch recipe details");
    }

    const detailData = await detailResponse.json();

    return {
      success: true,
      recipe: detailData.meals[0],
    };
  } catch (error) {
    console.error("Error fetching recipe of the day:", error);
    throw new Error(error.message || "Failed to load recipe");
  }
}

// export async function getRecipeOfTheDay() {
//   try {
//     // 1. Fetch all vegetarian meals
//     const listResponse = await fetch(`${MEALDB_BASE}/filter.php?c=Vegetarian`, {
//       next: { revalidate: 43200 }, // Cache for 12 hours
//     });

//     if (!listResponse.ok) {
//       throw new Error("Failed to fetch vegetarian meals list");
//     }

//     const listData = await listResponse.json();
    
//     if (!listData.meals || listData.meals.length === 0) {
//       throw new Error("No vegetarian meals found");
//     }

//     // 2. Use the current date to pick a consistent "Recipe of the Day"
//     const daysSinceEpoch = Math.floor(Date.now() / 86400000);
//     const mealIndex = daysSinceEpoch % listData.meals.length;
//     const selectedMeal = listData.meals[mealIndex];

//     // 3. Fetch the full details of the selected meal to get descriptions, instructions, etc.
//     const detailResponse = await fetch(`${MEALDB_BASE}/lookup.php?i=${selectedMeal.idMeal}`, {
//       next: { revalidate: 86400 }, // Cache for 24 hours
//     });

//     if (!detailResponse.ok) {
//       throw new Error("Failed to fetch recipe details");
//     }

//     const detailData = await detailResponse.json();

//     return {
//       success: true,
//       recipe: detailData.meals[0],
//     };
//   } catch (error) {
//     console.error("Error fetching recipe of the day:", error);
//     throw new Error(error.message || "Failed to load recipe");
//   }
// }

// Get all categories
export async function getCategories() {
    try{
        const response = await fetch(`${MEALDB_BASE}/categories.php`, {
            next: { revalidate: 604800 }, // Cache for 7 days
        });
        if (!response.ok) {
            throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        
        // Filter out non-veg categories
        const nonVegCategories = ["beef", "chicken", "pork", "seafood", "lamb", "goat"];
        const filteredCategories = (data.categories || []).filter(
            (category) => !nonVegCategories.includes(category.strCategory.toLowerCase())
        );

        return {
            success: true,
            //below 2 lines are used when i was using strapi, when i add filteredCategories line, it will show
            //  veg-food and also use when i was using non-veg line
            // categories: data.meals || [],
            // categories: data.categories || [],
            categories: filteredCategories,
        };  
    }
    catch(error){
        console.error("Error fetching categories:", error);
        throw new Error(error.message || "Failed to load categories");
    }
}

// Get all areas/cuisines
export async function getAreas() {
  try {
    const response = await fetch(`${MEALDB_BASE}/list.php?a=list`, {
      next: { revalidate: 604800 }, // Cache for 1 week
    });

    if (!response.ok) {
      throw new Error("Failed to fetch areas");
    }

    const data = await response.json();
    return {
      success: true,
      areas: data.meals || [],
    };
  } catch (error) {
    console.error("Error fetching areas:", error);
    throw new Error(error.message || "Failed to load areas");
  }
}

// Get meals by category
export async function getMealsByCategory(category) {
  try {
    const response = await fetch(`${MEALDB_BASE}/filter.php?c=${category}`, {
      next: { revalidate: 86400 }, // Cache for 24 hours
    });

    if (!response.ok) {
      throw new Error("Failed to fetch meals");
    }

    const data = await response.json();
    return {
      success: true,
      meals: data.meals || [],
      category,
    };
  } catch (error) {
    console.error("Error fetching meals by category:", error);
    throw new Error(error.message || "Failed to load meals");
  }
}

// Get meals by area
export async function getMealsByArea(area) {
  try {
    const response = await fetch(`${MEALDB_BASE}/filter.php?a=${area}`, {
      next: { revalidate: 86400 }, // Cache for 24 hours
    });

    if (!response.ok) {
      throw new Error("Failed to fetch meals");
    }

    const data = await response.json();
    return {
      success: true,
      meals: data.meals || [],
      area,
    };
  } catch (error) {
    console.error("Error fetching meals by area:", error);
    throw new Error(error.message || "Failed to load meals");
  }
}