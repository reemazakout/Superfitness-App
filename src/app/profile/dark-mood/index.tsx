import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function DarkMood() {
  // State
  const [darkMode, setDarkMode] = useState(false);
  // DarkMode
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
    <div className="w-[209px]  h-[168px] dark:border-white border-2 border-black rounded-xl flex flex-col items-center justify-center ">
      {darkMode ? <Sun color="#ff4100" /> : <Moon color="#ff4100" />}
      <p className="text-black my-3 dark:text-white text-xl font-bold">
        Mood (<span className="text-flame">{darkMode ? "Dark" : "Light"}</span>){" "}
      </p>
      <Switch checked={darkMode} className="!bg-flame" onCheckedChange={toggleDarkMode} />
    </div>
  );
}
