/*
 * ==========================================
 * File: Sign Up Page
 * What there's work: Renders the Clerk SignUp component for creating a new user account.
 * Features in browser: User registration form with email and social link options.
 * In which button they are working: Navigated via "Sign Up" / "Get Started" button on the home page or navbar.
 * ==========================================
 */
import React from 'react'
import { SignUp } from '@clerk/nextjs'

const SignUpPage = () => {
  return (
    <SignUp/>
  )
}

export default SignUpPage