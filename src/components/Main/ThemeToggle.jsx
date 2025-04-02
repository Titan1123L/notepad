import React, { useState, useEffect } from "react";
import { BsCloudSun, BsCloudSunFill } from "react-icons/bs";

function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark-mode");
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);

    if (darkMode) {
      document.documentElement.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <button onClick={toggleTheme} className="theme-toggle">
      {darkMode ? <BsCloudSunFill size={24} /> : <BsCloudSun size={24} />}
    </button>
  );
}

export default ThemeToggle;
