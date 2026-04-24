/*
 * ==========================================
 * File: Header Component
 * What there's work: Main top navigation bar.
 * Features in browser: Logo placeholder, user profile dropdown via Clerk, and main navigation links (Dashboard, My Pantry).
 * In which button they are working: Present on all pages. Logo clicks navigate to Dashboard/Home.
 * ==========================================
 */
import { SignInButton, SignUpButton, UserButton, Show } from '@clerk/nextjs'
import React from 'react'
import { Button } from "./ui/button";
import Link from "next/link";
import Image from 'next/image';
import { Cookie, Refrigerator, Sparkles } from 'lucide-react';
import UserDropdown from './UserDropdown';
import { checkUser } from '@/lib/checkUser';
import PricingModal from './PricingModal';
import { Badge } from './ui/badge';
import HowToCookModal from './HowToCookModal';


const Header = async () => {
    const user = await checkUser(); //Replace with actual user fetching logic
    return (
        <header className="fixed top-0 w-full border-b border-stone-200 bg-stone-50/80 backdrop-blur-md z-50 
     supports-backdrop-filter:bg-stone-50/60">
            <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href={user ? "/dashboard" : "/"}> <Image src="/Foodie-diet-circle2.png"
                    alt="Servd Logo"
                    width={60} height={60} className="w-16" /></Link>
                <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-stone-600">
                    <Link
                        href="/recipes"
                        className="hover:text-orange-600 transition-colors flex gap-1.5 items-center"
                    >
                        <Cookie className="w-4 h-4" />
                        My Recipes
                    </Link>
                    <Link
                        href="/pantry"
                        className="hover:text-orange-600 transition-colors flex gap-1.5 items-center"
                    >
                        <Refrigerator className="w-4 h-4" />
                        My Pantry
                    </Link>
                </div>
                <div className="flex items-center space-x-4">
                    {/* Shows only when the user is signed in */}
                    <Show when="signed-in">
                        <UserDropdown />
                    </Show>

                    <HowToCookModal />


                    {user && (<PricingModal
                        subscriptionTier={user.subscriptionTier}>
                        <Badge
                            variant="outline"
                            className={`flex h-8 px-3 gap-1.5 rounded-full text-xs font-semibold transition-all ${user.subscriptionTier === "pro"
                                ? "bg-linear-to-r from-orange-600 to-amber-500 text-white border-none shadow-sm"
                                : "bg-stone-200/50 text-stone-600 border-stone-200 cursor-pointer hover:bg-stone-300/50 hover:border-stone-300"
                                }`}
                        >
                            <span>
                                {user.subscriptionTier === "pro" ? "Pro Chef" : "Free Plan"}
                            </span>
                        </Badge>
                    </PricingModal>)}

                    {/* Shows only when the user is signed out */}
                    <Show when="signed-out">
                        <SignInButton mode="modal" >
                            <Button
                                variant="ghost"
                                className="text-stone-600 hover:text-orange-600 hover:bg-orange-50 font-medium"
                            >
                                Sign In
                            </Button>
                        </SignInButton>

                        <SignUpButton mode="modal">
                            <Button variant="primary" className="rounded-full px-6">
                                Get Started
                            </Button>
                        </SignUpButton>
                    </Show>

                </div>
            </nav>
        </header>
    )
}

export default Header;