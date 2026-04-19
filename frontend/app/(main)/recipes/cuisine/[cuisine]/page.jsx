/*
 * ==========================================
 * File: Cuisine Recipes Page
 * What there's work: Dynamically lists recipes specific to a selected cuisine type.
 * Features in browser: Browsing grid of recipes mapped to a specific URL parameter (e.g., Italian, Mexican).
 * In which button they are working: Accessed by clicking a specific Cuisine category card or filter button.
 * ==========================================
 */
"use client"

import { useParams } from "next/navigation";
import RecipeGrid from "@/components/RecipeGrid";
import { getMealsByArea } from "@/actions/mealdb.actions";

export default function CuisineRecipesPage(){
    const params = useParams();
    const cuisine = params.cuisine;

    return(
        <RecipeGrid
        type="cuisine"
        value={cuisine}
        fetchAction={getMealsByArea}
        backLink="/dashboard"
        />
    );
}