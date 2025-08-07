// src/pages/NotFoundPage404Page.jsx
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function NotFoundPage404Page() {
  // Translation
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-9xl font-bold text-flame">404</h1>
      <h2 className="text-3xl md:text-4xl font-semibold mt-4 text-foreground">
        {t("404-not-found-page")}
      </h2>
      <p className="mt-2 text-foreground">{t("the-page-you-are-looking-for-dose-not-exist")}</p>
      <Link
        to="/"
        className="mt-6 inline-block px-6 py-3 bg-flame text-white rounded-xl text-sm font-medium hover:bg-orange-600 transition-all duration-300"
      >
        {t("back-to-home-page")}
      </Link>
    </div>
  );
}
