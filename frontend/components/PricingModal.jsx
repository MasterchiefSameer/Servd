"use client"

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog'
import React, { useState } from 'react'
import PricingSection from './PricingSection'

const PricingModal = ({ subscriptionTier = "free", children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isPro = subscriptionTier === "pro";

  if (isPro) {
    return <>{children}</>;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <span className="cursor-pointer">{children}</span>
      </DialogTrigger>
      <DialogContent className="p-8 pt-4 sm:max-w-4xl">
        <DialogTitle className="sr-only">Pricing Plans</DialogTitle>
        <PricingSection />
      </DialogContent>
    </Dialog>
  )
}

export default PricingModal