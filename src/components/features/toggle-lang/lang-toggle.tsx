import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function LangToggle() {
  //Translation
  const { i18n: i18next } = useTranslation(); // this subscribes to language changes

  // State
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");

  //
  const toggleLang = () => {
    const newLang = lang === "en" ? "ar" : "en";
    const newDir = newLang === "ar" ? "rtl" : "ltr";

    // Save to localStorage
    localStorage.setItem("lang", newLang);
    localStorage.setItem("direction", newDir);

    // Update i18n + DOM
    document.body.style.direction = newDir;
    document.body.classList.remove(lang);
    document.body.classList.add(newLang);
    i18next.changeLanguage(newLang); // <- triggers re-render

    setLang(newLang);
  };

  return (
    <button
      onClick={toggleLang}
      className="px-4 py-2 rounded-[100px] font-medium text-charcoal dark:text-cloudy transition-colors duration-500 border border-transparent hover:border-flame"
    >
      {lang === "en" ? "🇸🇦 العربية" : "🇬🇧 English"}
    </button>
  );
}
