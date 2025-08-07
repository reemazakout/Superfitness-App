import Marquee from "react-fast-marquee";
import { Sparkle } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function AnnouncementBar() {
  const { t } = useTranslation(); // <-- access t

  const items = [
    t("outdoor-and-online-trainers"),
    t("personal-training"),
    t("live-classes"),
    t("personal-trainers"),
    t("personal-classes"),
  ];

  return (
    <div className=" bg-flame text-2xl font-bold text-cloudy overflow-hidden uppercase z-10">
      <Marquee
        loop={0}
        direction={localStorage.getItem("direction") === "rtl" ? "right" : "left"}
        speed={50}
      >
        <div className="flex items-center gap-3 py-6 text-white text-lg font-bold">
          {items.map((item, index) => (
            <span className="flex items-center gap-4" key={index}>
              <Sparkle fill="white" />
              {item}
            </span>
          ))}
        </div>
      </Marquee>
    </div>
  );
}
