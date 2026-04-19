/*
 * ==========================================
 * File: User Dropdown Component
 * What there's work: Wraps Clerk's user button or renders a custom dropdown for account/billing management.
 * Features in browser: Dropdown overlay showing profile info, settings, billing management, and logout.
 * In which button they are working: Triggered by clicking the user's avatar image in the top right Header.
 * ==========================================
 */
"use client";

import { UserButton } from "@clerk/nextjs";
import { Refrigerator, Cookie } from "lucide-react";
import React from "react";

const UserDropdown = () => {
  return (
    <UserButton>
      <UserButton.MenuItems>
        <UserButton.Link
          label="My Recipes"
          labelIcon={<Cookie size={16} />}
          href="/recipes"
        />
        <UserButton.Link
          label="My Pantry"
          labelIcon={<Refrigerator size={16} />}
          href="/pantry"
        />
        <UserButton.Action label="manageAccount" />
      </UserButton.MenuItems>
    </UserButton>
  );
};

export default UserDropdown;