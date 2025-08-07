import { Button } from "@/components/ui/button";
import HeroImage from "@/assets/images/hero-image.png";
import AnnouncementBar from "@/components/features/announcement-bar";
import ArrowIconRight from "@/components/common/right-arrow-icon/ArrowIconRight";
import { useTranslation } from "react-i18next";

export default function HeroSection() {
  // Initialize translation function
  const { t } = useTranslation();

  return (
    <>
      {/* ===== Hero Section ===== */}
      <section className="grid grid-cols-1 md:grid-cols-2 font-rubik mt-[110px] md:mt-[200px] mx-4 md:mx-20">
        {/* ===== Left Content Section ===== */}
        <div className="left pt-0 text-charcoal dark:text-cloudy md:pt-16">
          {/* --- Heading --- */}
          <h1 className="text-2xl md:text-6xl font-bold font-baloo mb-6 uppercase max-w-[212px] md:max-w-full xl:min-w-[677px]">
            {t("Your body can")} <span className="text-flame">{t("stand-almost")}</span>{" "}
            {t("anything")}
          </h1>

          {/* --- Message --- */}
          <div className="flex">
            <div className="w-1 min-h-full bg-flame rounded-lg"></div>
            <p className="text-lg max-w-[559px] ms-4">
              {t(
                "its-your-mind-that-needs-convincing-push-past-your-limits-stay-committed-and-watch-as-your-body-transform-into-powerhouse-of-strength-and-resilience-start-your-journey-today-and-truly-capable-of"
              )}
            </p>
          </div>

          {/* --- Counter Boxes --- */}
          <div className="counter-box grid grid-cols-1 md:grid-cols-3 mt-16">
            {/* --- Counter Items --- */}
            <div className="counter-item">
              <h3 className="text-2xl font-bold">1200+</h3>
              <p className="text-lg">{t("active-members")}</p>
            </div>
            <div className="counter-item">
              <h3 className="text-2xl font-bold">12+</h3>
              <p className="text-lg">{t("certified-trainers")}</p>
            </div>
            <div className="counter-item">
              <h3 className="text-2xl font-bold">20+</h3>
              <p className="text-lg">{t("years-of-experience")}</p>
            </div>
          </div>

          {/* --- Call-to-Action Buttons --- */}
          <div className="cta mt-16 mb-4 flex flex-wrap gap-5 md:gap-10 justify-between items-center md:justify-normal">
            <Button variant="flame" size="flameLg" className="m-2">
              {t("get-started")}
              <ArrowIconRight />
            </Button>

            <Button variant="flameOutline" size="flameLg">
              {t("explore-more")}
              <ArrowIconRight />
            </Button>
          </div>
        </div>

        {/* ===== Right Image Section ===== */}
        <div className="right">
          <img src={HeroImage} alt="Hero Image" className="mx-auto" />
        </div>
      </section>

      {/* --- Marquee Section --- */}
      <AnnouncementBar />
    </>
  );
}
