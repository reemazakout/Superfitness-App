import { RefreshCw } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function UserDetails() {
  // Translation
  const { t } = useTranslation();

  return (
    <div className="relative z-10 flex flex-wrap justify-center items-center gap-10 my-10 ">
      {/* Your Goal */}
      <div className="flex flex-col justify-center items-center ">
        <h2 className="text-3xl font-bold"> {t("Your Goal")}</h2>
        <p className="underline text-sm my-2"> {t("TAP TO CHANGE")}</p>
        <div className="flex justify-between border-[#D3D3D3] border-2 items-center w-52 bg-flame px-3 py-2 rounded-full ">
          <span className="text-[#D3D3D3]"> {t("Lose Weight")}</span>
          <RefreshCw color="#D3D3D3" />
        </div>
      </div>

      {/* Level */}
      <div className="flex flex-col justify-center items-center ">
        <h2 className="text-3xl font-bold">{t("Level")}</h2>
        <p className="underline text-sm my-2">{t("TAP TO CHANGE")}</p>
        <div className="flex justify-between border-[#D3D3D3] border-2 items-center w-52 bg-flame px-3 py-2 rounded-full ">
          <span className="text-[#D3D3D3]">{t("Beginner")}</span>
          <RefreshCw color="#D3D3D3" />
        </div>
      </div>

      {/* Weight */}
      <div className="flex flex-col justify-center items-center ">
        <h2 className="text-3xl font-bold">{t("Weight")}</h2>
        <p className="underline text-sm my-2">{t("TAP TO CHANGE")}</p>
        <div className="flex justify-between border-[#D3D3D3] border-2 items-center w-52 bg-flame px-3 py-2 rounded-full ">
          <span className="text-[#D3D3D3]">90 Kg</span>
          <RefreshCw color="#D3D3D3" />
        </div>
      </div>
    </div>
  );
}
