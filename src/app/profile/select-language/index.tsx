import { Globe } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function SelectLanguagePage() {
  //Translation
  const { i18n: i18next, t } = useTranslation();

  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");

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
    <div className="w-[209px]  h-[168px] dark:border-white border-2 border-black rounded-xl flex flex-col items-center justify-center ">
      <Globe color="#ff4100" />
      <p className="text-black dark:text-white text-xl font-bold">{t("Select Language")}</p>
      <p onClick={toggleLang} className="text-black hover:cursor-pointer dark:text-white">
        (<span className="text-flame font-bold">{lang == "en" ? "عربي" : "English"}</span>)
      </p>
    </div>
  );
}
