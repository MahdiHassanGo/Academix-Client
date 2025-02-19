import { createContext, useEffect, useState } from "react";

// Create Theme Context
export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  // Load saved theme or default to 'light'
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Apply theme to <html> element & save in localStorage
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle between light and dark theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
