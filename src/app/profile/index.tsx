import { KeyRound, Lock, LogOut, RefreshCw, ShieldAlert } from "lucide-react";
import { useTranslation } from "react-i18next";
import UserDetails from "./user-details";
import SelectLanguagePage from "./select-language";
import DarkMood from "./dark-mood";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  //Translation
  const { t } = useTranslation();

  // Navigations
  const navigate = useNavigate();

  // Functions
  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
    setTimeout(() => {
      window.location.reload();
    }, 50);
  };

  return (
    <div className="min-h-screen bg-hero-bg bg-cover bg-center flex flex-col items-center justify-center before:content-[''] before:absolute before:w-full before:h-full before:backdrop-blur-[12.5px]   before:top-0 before:left-0 before:bg-[#FFFFFF99] before:dark:bg-[#24242499] backdrop-blur-[35.1px] py-8 md:py-14">
      <div className="h-[100px] xl:h-[25px]"></div>

      {/* User Details */}
      <UserDetails />

      {/* Options */}
      <div className="relative w-4/5 md:w-3/5 mx-auto flex flex-wrap items-center justify-center gap-5  z-10">
        {/* Change Password */}
        <div className="w-[209px]  h-[168px] dark:border-white border-2 border-black rounded-xl flex flex-col items-center justify-center ">
          <RefreshCw color="#ff4100" />
          <p className="text-black dark:text-white text-xl font-bold">{t("Change Password")}</p>
        </div>

        {/* Select Language */}
        <SelectLanguagePage />

        {/* Dark Mood */}
        <DarkMood />

        {/* Security */}
        <div className="w-[209px]  h-[168px] dark:border-white border-2 border-black rounded-xl flex flex-col items-center justify-center ">
          <Lock color="#ff4100" />
          <p className="text-black dark:text-white text-xl font-bold"> {t("Security")}</p>
        </div>

        {/* Privacy Policy */}
        <div className="w-[209px]  h-[168px] dark:border-white border-2 border-black rounded-xl flex flex-col items-center justify-center ">
          <ShieldAlert color="#ff4100" />
          <p className="text-black dark:text-white text-xl font-bold">{t("Privacy Policy")}</p>
        </div>

        {/* Help */}
        <div className="w-[209px]  h-[168px] dark:border-white border-2 border-black rounded-xl flex flex-col items-center justify-center ">
          <KeyRound color="#ff4100" />
          <p className="text-black dark:text-white text-xl font-bold">{t("Help")}</p>
        </div>

        {/* LogOut */}
        <div className="w-[209px] cursor-pointer h-[168px] dark:border-white border-2 border-black rounded-xl flex flex-col items-center justify-center ">
          <LogOut color="#ff4100" onClick={() => logOut()} />
          <p className="text-flame text-xl font-bold">{t("LogOut")}</p>
        </div>
      </div>
    </div>
  );
}
