import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { User } from "lucide-react"; // أيقونة المستخدم من lucide
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/features/toggle-dark-mode/theme-toggle";
import LangToggle from "@/components/features/toggle-lang/lang-toggle";
import ArrowIconRight from "@/components/common/right-arrow-icon/ArrowIconRight";
import i18n from "@/lib/utils/i18n";
import { useTranslation } from "react-i18next";

export default function DesktopHeader() {
  // Translations
  const { t } = useTranslation();

  // State
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // UseEffect
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Navigation links
  const navLinks = [
    { id: 1, name: t("Home"), link: "/" },
    { id: 2, name: t("About"), link: "/about" },
    { id: 3, name: t("Classes"), link: "/classes" },
    { id: 4, name: t("Healthy"), link: "/healthy" },
  ];

  // Functions
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `font-bold text-base ${isActive ? "text-flame" : "text-foreground"}`;

  return (
    <header className="hidden lg:flex z-10 items-center justify-between mx-20 top-10 left-0 right-0 absolute font-baloo">
      {/* Logo */}
      <Link to="/">
        <img
          src="/src/assets/images/logo.svg"
          className="w-[87px] h-14 object-contain"
          alt="logo"
        />
      </Link>

      {/* Navigation */}
      <nav className="flex items-center gap-4 text-xl font-bold">
        {navLinks.map((link) => (
          <NavLink
            key={link.id}
            to={link.link}
            className={({ isActive }) => getNavLinkClass({ isActive })}
          >
            {link.name}
          </NavLink>
        ))}
      </nav>

      {/* Header Actions */}
      <div className="flex gap-5 items-center text-base font-bold">
        <ThemeToggle />
        <LangToggle />

        {!isLoggedIn ? (
          <>
            {/* Login */}
            <NavLink to="/login">
              <Button
                variant="flame"
                size="default"
                className={`relative min-w-20 min-h-11 flex items-center gap-2 uppercase ${
                  i18n.dir() === "rtl" ? "flex-row-reverse" : ""
                }`}
              >
                {t("login")}
                <ArrowIconRight />
              </Button>
            </NavLink>

            {/* Sign Up */}
            <NavLink to="/register">
              <Button
                variant="flameOutline"
                size="default"
                className={`relative border-2 min-w-20 min-h-11 flex items-center gap-2 uppercase ${
                  i18n.dir() === "rtl" ? "flex-row-reverse" : ""
                }`}
              >
                {t("sign-up")}
                <ArrowIconRight />
              </Button>
            </NavLink>
          </>
        ) : (
          // If logged in: Show user avatar or icon
          <NavLink to="/profile">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-flame hover:shadow-md transition">
              <User className="text-white w-5 h-5" />
            </div>
          </NavLink>
        )}
      </div>
    </header>
  );
}
