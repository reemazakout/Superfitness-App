import { Menu, User } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "@/assets/images/logo.svg";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import ThemeToggle from "@/components/features/toggle-dark-mode/theme-toggle";
import LangToggle from "@/components/features/toggle-lang/lang-toggle";

export default function MobileHeader() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const navLinks = [
    { id: 1, name: t("Home"), link: "/" },
    { id: 2, name: t("About"), link: "/about" },
    { id: 3, name: t("Classes"), link: "/classes" },
    { id: 4, name: t("Healthy"), link: "/healthy" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="lg:hidden flex z-50 items-center justify-between mx-5 top-5 left-0 right-0 absolute font-baloo">
      {/* Logo */}
      <Link to="/" onClick={closeMenu}>
        <img src={logo} className="w-[87px] h-14 object-contain" alt="logo" />
      </Link>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <LangToggle />

        {/* If Logged In: Show User Icon */}
        {isLoggedIn ? (
          <Link to="/profile" onClick={closeMenu}>
            <div className="w-10 h-10 rounded-full border-2 border-flame flex items-center justify-center bg-white hover:shadow-md transition">
              <User className="text-flame w-6 h-6" />
            </div>
          </Link>
        ) : (
          <button
            onClick={toggleMenu}
            className="w-12 h-12 bg-flame text-white rounded-full flex items-center justify-center"
          >
            <Menu size={25} />
          </button>
        )}
      </div>

      {/* Background Overlay */}
      {isMenuOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={closeMenu} />}

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-auto w-80 bg-surface shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Menu Header */}
        <div className="flex items-center justify-between mx-auto mt-6 mb-4">
          <Link to="/" onClick={closeMenu}>
            <img src={logo} className="w-[87px] mx-4 h-14 object-contain" alt="logo" />
          </Link>
        </div>

        {/* Links */}
        <nav className="flex flex-col px-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.id}
              to={link.link}
              className="mb-4 font-baloo font-bold text-xl text-foreground"
              onClick={closeMenu}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* If Not Logged In: Show Buttons */}
        {!isLoggedIn && (
          <>
            <NavLink to="/login" onClick={closeMenu}>
              <Button
                variant={"flame"}
                className="w-[90%] mt-10 min-h-12 mx-auto px-5 py-3 flex items-center justify-center uppercase "
              >
                {t("login")}
              </Button>
            </NavLink>

            <NavLink to="/register" onClick={closeMenu}>
              <Button
                variant={"flameOutline"}
                className="w-[90%] min-h-12 mt-3 mb-6 mx-auto px-5 py-3 flex items-center justify-center uppercase "
              >
                {t("sign-up")}
              </Button>
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
}
