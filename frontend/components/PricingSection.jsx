/*
 * ==========================================
 * File: Pricing Section Component
 * What there's work: Reusable UI section displaying available pricing plans and subscription benefits.
 * Features in browser: Side-by-side pricing cards, feature bullet lists.
 * In which button they are working: Typically rendered on the landing page or a dedicated /pricing page.
 * ==========================================
 */
import React from 'react'
import { PricingTable } from "@clerk/nextjs";

const PricingSection = () => {
  return (
    <div className="max-w-4xl">
      <div className="mb-16">
        <h2 className="text-5xl md:text-6xl font-bold mb-4">Simple Pricing</h2>
        <p className="text-xl text-stone-600 font-light">
          Start for free. Upgrade to become a master chef.
        </p>
      </div>
      <div className="max-w-4xl">
        <PricingTable checkoutProps={{
          appearance:{
            elements:{
              drawerRoot:{
                zIndex:2000,
              }
            }
          }
        }}/>
      </div>
      </div>
  )
}

export default PricingSection