import { t } from "i18next";
import { Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-cloudy text-charcoal dark:bg-charcoal dark:text-cloudy">
      <div className="grid grid-cols-4 gap-4  justify-items-center pt-10 pb-20">
        <div className="col-span-4 sm:col-span-2  space-y-2  lg:col-span-1">
          {" "}
          <img src="/src/assets/images/logo.svg" alt="logo" />
          <p>{t("Push harder, go further. Your ")}</p>
          <p>{t("fitness journey starts today! ")}</p>
        </div>
        <div className="col-span-4 sm:col-span-2 lg:col-span-1 space-y-2 ">
          {" "}
          <h3 className="font-bold uppercase">{t("contact us")}</h3>{" "}
          <div className="flex items-center gap-2">
            <div className=" p-2 rounded-full border-2 border-black w-fit">
              <Phone size={18} />
            </div>
            <p>+91 123 456 789</p>
          </div>
          <div className="flex items-center gap-2">
            <div className=" p-2 rounded-full border-2 border-black w-fit">
              <Mail size={18} />
            </div>
            <p>info@gmail.com</p>
          </div>
        </div>
        <div className="col-span-4 sm:col-span-2 space-y-2 lg:col-span-1">
          <h3 className="font-bold uppercase">{t("our gym timing")}</h3>
          <p>Mon - Fri : 08:00 AM - 10:00 PM</p>
          <p>Sat - Sun : 08:00 AM - 08:00 PM</p>
        </div>
        <div className="col-span-4 sm:col-span-2 space-y-2 lg:col-span-1">
          <h3 className="font-bold uppercase">{t("our location")}</h3>
          <p>2715 Ash Dr. San Jose, South </p>
          <p>Dakota 83475</p>
        </div>
      </div>
    </footer>
  );
}
