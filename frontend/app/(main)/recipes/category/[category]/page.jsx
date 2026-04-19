/*
 * ==========================================
 * File: Category Recipes Page
 * What there's work: Dynamically lists recipes by meal category (e.g., Breakfast, Lunch, Dinner).
 * Features in browser: Shows a grid of recipes filtered by the selected meal category.
 * In which button they are working: Accessed by clicking a Meal Category button or link in the Dashboard.
 * ==========================================
 */
"use client"

import { useParams } from "next/navigation";
import RecipeGrid from "@/components/RecipeGrid";
import { getMealsByCategory } from "@/actions/mealdb.actions";

export default function CategoryRecipesPage(){
    const params = useParams();
    const category = params.category;

    return(
        <RecipeGrid
        type="category"
        value={category}
        fetchAction={getMealsByCategory}
        backLink="/dashboard"
        />
    );
}