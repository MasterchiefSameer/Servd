/*
 * ==========================================
 * File: Main Authenticated Layout
 * What there's work: Wraps the main application pages structure, typically including the Header/Navigation.
 * Features in browser: Persistent UI across all dashboard pages.
 * In which button they are working: Automatically applied wrapper to all routes within the main app group.
 * ==========================================
 */
// All private routes
const MainLayout = ({ children }) => {
    return <div className="pt-10">{children}</div>;
};

export default MainLayout