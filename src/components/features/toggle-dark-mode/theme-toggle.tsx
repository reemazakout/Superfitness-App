import { useEffect, useState } from "react";

export default function ThemeToggle() {
  // State
  const [darkMode, setDarkMode] = useState(false);

  // Functions
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    setDarkMode(newMode);
  };

  // useEffect
  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    document.documentElement.classList.toggle("dark", isDark);
    setDarkMode(isDark);
  }, []);

  return (
    <button
      onClick={toggleDarkMode}
      className="px-4 py-2 rounded-[100px] font-medium text-charcoal dark:text-cloudy transition-colors duration-500 border border-transparent hover:border-flame"
    >
      {darkMode ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
