/*
 * ==========================================
 * File: Sign In Page
 * What there's work: Renders the Clerk SignIn component for user login authentication.
 * Features in browser: User login form.
 * In which button they are working: Navigated via "Log In" / "Sign In" button on the home page or navbar.
 * ==========================================
 */
import React from 'react'
import { SignIn } from '@clerk/nextjs'

const SignInPage = () => {
  return (
    <SignIn/>
  )
}

export default SignInPage