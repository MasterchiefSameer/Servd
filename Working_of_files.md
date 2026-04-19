const fs = require('fs');
const path = require('path');

const comments = {
  "app/(main)/dashboard/page.jsx": `/*
 * ==========================================
 * File: Dashboard Page
 * What there's work: Acts as the main landing dashboard for authenticated users. Displays categories, recent/saved recipes, and quick actions.
 * Features in browser: Shows personalized greeting, recipe categories carousel, and recent recipe grids.
 * In which button they are working: Accessed via the "Dashboard" nav link or immediately after successful Sign In.
 * ==========================================
 */\n`,
  "app/(auth)/sign-up/[[...sign-up]]/page.jsx": `/*
 * ==========================================
 * File: Sign Up Page
 * What there's work: Renders the Clerk SignUp component for creating a new user account.
 * Features in browser: User registration form with email and social link options.
 * In which button they are working: Navigated via "Sign Up" / "Get Started" button on the home page or navbar.
 * ==========================================
 */\n`,
  "app/(auth)/sign-in/[[...sign-in]]/page.jsx": `/*
 * ==========================================
 * File: Sign In Page
 * What there's work: Renders the Clerk SignIn component for user login authentication.
 * Features in browser: User login form.
 * In which button they are working: Navigated via "Log In" / "Sign In" button on the home page or navbar.
 * ==========================================
 */\n`,
  "app/(main)/recipes/page.jsx": `/*
 * ==========================================
 * File: All Recipes / Saved Recipes Page
 * What there's work: Displays a collection of the user's saved recipes or general recipes.
 * Features in browser: Recipe grid viewing, filtering, or pagination for browsing cookbooks.
 * In which button they are working: Accessed via "My Recipes", "Saved Recipes", or "Cookbook" button.
 * ==========================================
 */\n`,
  "app/(main)/recipes/cuisine/[cuisine]/page.jsx": `/*
 * ==========================================
 * File: Cuisine Recipes Page
 * What there's work: Dynamically lists recipes specific to a selected cuisine type.
 * Features in browser: Browsing grid of recipes mapped to a specific URL parameter (e.g., Italian, Mexican).
 * In which button they are working: Accessed by clicking a specific Cuisine category card or filter button.
 * ==========================================
 */\n`,
  "app/page.jsx": `/*
 * ==========================================
 * File: Home Page (Landing)
 * What there's work: The public marketing landing page for unauthenticated visitors.
 * Features in browser: Hero section, features overview, and call-to-action to sign up for ServedDiet.
 * In which button they are working: Root URL "/" - typically accessed by visiting the base site URL or clicking the main Logo.
 * ==========================================
 */\n`,
  "app/(main)/recipes/category/[category]/page.jsx": `/*
 * ==========================================
 * File: Category Recipes Page
 * What there's work: Dynamically lists recipes by meal category (e.g., Breakfast, Lunch, Dinner).
 * Features in browser: Shows a grid of recipes filtered by the selected meal category.
 * In which button they are working: Accessed by clicking a Meal Category button or link in the Dashboard.
 * ==========================================
 */\n`,
  "app/(main)/pantry/recipes/page.jsx": `/*
 * ==========================================
 * File: Pantry AI Recipe Results Page
 * What there's work: Displays AI-generated recipe suggestions based on current pantry ingredients.
 * Features in browser: List of customized AI recipes, match percentage, missing ingredients, and generation UI.
 * In which button they are working: Accessed after clicking "Find Recipes" or "What can I cook?" from the My Pantry page.
 * ==========================================
 */\n`,
  "app/(main)/layout.jsx": `/*
 * ==========================================
 * File: Main Authenticated Layout
 * What there's work: Wraps the main application pages structure, typically including the Header/Navigation.
 * Features in browser: Persistent UI across all dashboard pages.
 * In which button they are working: Automatically applied wrapper to all routes within the main app group.
 * ==========================================
 */\n`,
  "app/(main)/pantry/page.jsx": `/*
 * ==========================================
 * File: My Pantry Page
 * What there's work: Manages user's available ingredients and handles uploading food images to scan via AI.
 * Features in browser: Image uploader drag/drop zone, list of current ingredients, delete/edit items, "Find Recipes" trigger.
 * In which button they are working: Accessed via the "My Pantry" / "Pantry" navigation tab on the Header.
 * ==========================================
 */\n`,
  "app/(main)/recipe/page.jsx": `/*
 * ==========================================
 * File: Single Recipe Detail Page
 * What there's work: Shows detailed view for a specific recipe (ingredients, instructions, nutrition, tips, substitutions).
 * Features in browser: Step-by-step instruction timeline, ingredient checklist, toggle to save/bookmark recipe, Pro-locked sections.
 * In which button they are working: Accessed by clicking any specific "Recipe Card" or "View Recipe" button.
 * ==========================================
 */\n`,
  "components/AddToPantryModal.jsx": `/*
 * ==========================================
 * File: Add To Pantry Modal Component
 * What there's work: Interative modal overlay to let users type and manually add an ingredient to their pantry.
 * Features in browser: Form input fields for ingredient name and quantity.
 * In which button they are working: Triggered by clicking "Add Item Manually" or "+" button in the My Pantry page.
 * ==========================================
 */\n`,
  "components/Header.jsx": `/*
 * ==========================================
 * File: Header Component
 * What there's work: Main top navigation bar.
 * Features in browser: Logo placeholder, user profile dropdown via Clerk, and main navigation links (Dashboard, My Pantry).
 * In which button they are working: Present on all pages. Logo clicks navigate to Dashboard/Home.
 * ==========================================
 */\n`,
  "components/HowToCookModal.jsx": `/*
 * ==========================================
 * File: How To Cook Modal Component
 * What there's work: Displays a focused, step-by-step interactive view of recipe instructions.
 * Features in browser: Modal overlay with cooking steps.
 * In which button they are working: Triggered by clicking "Cook Now" or "How to Cook" button on a recipe details page.
 * ==========================================
 */\n`,
  "components/ImageUploader.jsx": `/*
 * ==========================================
 * File: Image Uploader Component
 * What there's work: Component that provides drag/drop or file selection for analyzing pantry images.
 * Features in browser: Hidden file input, drag-and-drop hot zone, loading animations for AI scan step.
 * In which button they are working: Used inside the "My Pantry" page when the user clicks the upload area or drops an image.
 * ==========================================
 */\n`,
  "components/PricingModal.jsx": `/*
 * ==========================================
 * File: Pricing Modal Component
 * What there's work: Displays the upgrade/pricing plans in an overlay without leaving the current page.
 * Features in browser: Free vs Pro tier comparison, feature limits description, and upgrade checkout buttons.
 * In which button they are working: Triggered by "Upgrade to Pro" buttons or when hitting specific Arcjet AI feature limits.
 * ==========================================
 */\n`,
  "components/PricingSection.jsx": `/*
 * ==========================================
 * File: Pricing Section Component
 * What there's work: Reusable UI section displaying available pricing plans and subscription benefits.
 * Features in browser: Side-by-side pricing cards, feature bullet lists.
 * In which button they are working: Typically rendered on the landing page or a dedicated /pricing page.
 * ==========================================
 */\n`,
  "components/RecipeCard.jsx": `/*
 * ==========================================
 * File: Recipe Card Component
 * What there's work: Reusable UI component that displays a miniature visual summary of a recipe.
 * Features in browser: Shows thumbnail recipe image, title, prep/cook time, and cuisine/category tags.
 * In which button they are working: Clicking the card container navigates directly to that specific recipe's details page.
 * ==========================================
 */\n`,
  "components/RecipeGrid.jsx": `/*
 * ==========================================
 * File: Recipe Grid Component
 * What there's work: Layout wrapper to display a collection of RecipeCard components.
 * Features in browser: Responsive multi-column grid layout for browsing recipes elegantly on mobile or desktop.
 * In which button they are working: Automatically wraps children elements, no specific button interaction.
 * ==========================================
 */\n`,
  "components/ProLockedSection.jsx": `/*
 * ==========================================
 * File: Pro Locked Section Component
 * What there's work: Wraps premium content to conditionally hide it from Free tier users.
 * Features in browser: Shows a blurry overlay or "Upgrade" prompt layered over premium content (like Nutrition specs or Chef Tips).
 * In which button they are working: Shows an Upgrade CTA button that triggers the Pricing Modal or Checkout flow.
 * ==========================================
 */\n`,
  "components/UserDropdown.jsx": `/*
 * ==========================================
 * File: User Dropdown Component
 * What there's work: Wraps Clerk's user button or renders a custom dropdown for account/billing management.
 * Features in browser: Dropdown overlay showing profile info, settings, billing management, and logout.
 * In which button they are working: Triggered by clicking the user's avatar image in the top right Header.
 * ==========================================
 */\n`
};

const basePath = "f:\\\\Web D\\\\Projects\\\\ServedDiet\\\\frontend";

for (const [relPath, comment] of Object.entries(comments)) {
  const fullPath = path.join(basePath, relPath.split("/").join(path.sep));
  if (fs.existsSync(fullPath)) {
    const existingContent = fs.readFileSync(fullPath, "utf-8");
    if (!existingContent.includes("What there's work:")) {
        fs.writeFileSync(fullPath, comment + existingContent);
        console.log("Added comment to " + relPath);
    } else {
        console.log("Skipped (already commented): " + relPath);
    }
  } else {
    console.log("File not found: " + fullPath);
  }
}
