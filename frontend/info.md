Question - How my terminal show GET /recipe?cook ... 
I didn't write any GET request
GET /recipe?cook=Roasted+Apple+and+Carrot+Medley+with+Caramelized+Onion

Answer  = That message in your terminal is completely normal and expected! You don't need to write a fetch() or axios.get() to see that.

Here is exactly why that is happening:

When you type a URL into your browser (or click a link like <Link href="/recipe?cook=Pasta">), your browser automatically reaches out to your Next.js server and says: "Hey, please GET me the HTML for the /recipe page with the search parameter cook=Pasta."

Because your Next.js server is currently running in your terminal (npm run dev), it logs every single time a browser asks it for a page.

So, GET /recipe?cook=... simply means:

GET: The browser is asking to "get" a webpage.
/recipe: The user is trying to view your app/(main)/recipe/page.jsx file.
?cook=...: The user passed some extra data in the URL, which you are correctly catching using searchParams.get("cook") in your code!

"CODE" __________________----------------_______
//Main recipe page "View Full Recipe"
"use client"

//  GET /recipe?cook=Roasted+Apple+and+Carrot+Medley+with+Caramelized+Onion
import { useSearchParams } from 'next/navigation'
import React from 'react'

const RecipeContent = () => {
  const searchParams = useSearchParams();
  const recipeName = searchParams.get("cook");  // name of search params is cook

    return (
      // Primary searved the loading purpose
    <div className = "min-h-screen bg-stone-50 pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-4xl text-center py-20">
      {recipeName}
      </div>
    </div>
  )
}

export default RecipeContent

<!-- In recipe.actions.js -->
// Step 1: Check if recipe already exists in DB (case-insensitive search)
// Step 2: If exists, return it immediately
// Step 3: If not, call Gemini API to generate recipe
// Step 4: Fetch image from Unsplash, 
// Step 5: Save generated recipe to DB
// Step 6: Return generated recipe

<!--  -->
What is FormData in every components?
What is FileReader in javascript?
What is rect-spinner library? Use ringloader component of this lib
What is react-pdf/renderer
What is react dropzone tool
What is populate in recipe.actions.js