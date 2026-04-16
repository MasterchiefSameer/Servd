import arcjet, { shield, tokenBucket, detectBot } from "@arcjet/next";

// Base Arcjet instance with global protections
export const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    // Shield WAF - protect against common attacks
    shield({
      mode: "LIVE", // Use "DRY_RUN" during development to test
    }),

    // Bot protection - allow search engines only
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
  ],
});

// Free tier pantry scan limits (10 scans per month)
export const freePantryScans = aj.withRule(
    tokenBucket({
        mode: "LIVE",// two type of mode : LIVE AND DRY_RUN
        characteristic: ["userId"], //how we are tracking the particular user
        refillRate: 10,
        // interval: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
        interval: "30d",
        capacity: 10,
    })
);
// Free tier meal recommendations (5 per month)
export const freeMealRecommendations = aj.withRule(
    tokenBucket({
        mode: "LIVE",// two type of mode : LIVE AND DRY_RUN
        characteristic: ["userId"], //how we are tracking the particular user
        refillRate: 5,
        // interval: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
        interval: "30d",
        capacity: 5,
    })
);
// Pro tier  - effectively unlimited (very high limits)
// 1000 request per day should be more than enough for any user
export const proTierLimit = aj.withRule(
    tokenBucket({
        mode: "LIVE",// two type of mode : LIVE AND DRY_RUN
        characteristic: ["userId"], //how we are tracking the particular user
        refillRate: 1000,
        // interval: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
        interval: "1d",
        capacity: 1000,
    })
);