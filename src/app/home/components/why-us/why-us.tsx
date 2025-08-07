import { useTranslation } from "react-i18next";
import whyus4 from "@/assets/images/why-us/whyus-4.png";
import whyus1 from "@/assets/images/why-us/whyus-1.png";
import whyus2 from "@/assets/images/why-us/whyus-2.jpg";
import whyus3 from "@/assets/images/why-us/whyus-3.jpg";
import whyus from "@/assets/images/why-us/whyus.png";
import { Dumbbell } from "lucide-react";
import HeadingTitle from "@/components/common/headingTitle";

export default function WhyUs() {
  //Translation
  const { t } = useTranslation();

  // Variables
  const features = [
    {
      id: 1,
      title: t("why-us-title-1"),
      description: t("why-us-description-1"),
      steps: 1,
    },
    {
      id: 2,
      title: t("why-us-title-2"),
      description: t("why-us-description-2"),
      steps: 2,
    },
    {
      id: 3,
      title: t("why-us-title-3"),
      description: t("why-us-description-3"),
      steps: 3,
    },
  ];

  return (
    <section className="px-4 md:px-10 lg:px-20 py-8 max-w-[1500px] mx-auto">
      <div className="grid lg:grid-cols-2 gap-10">
        <div>
          {/* Content Section */}
          <div className="flex flex-col font-baloo">
            <img src={whyus} alt="workout text" className="w-80 h-16 mt-10 object-contain" />
            <div className="flex items-center gap-2 -mt-5 capitalize text-base font-bold text-flame">
              <Dumbbell width={30} height={30} strokeWidth={1.3} />
              {t("why-us")}
            </div>
          </div>

          {/* Heading */}
          <HeadingTitle className="mt-6 text-foreground">
            {t("elevate-fitness-with-the")}
            <span className="text-flame ms-1">{t("best-way-possible")}</span>
          </HeadingTitle>

          {/* Description */}
          <p className="text-foreground text-lg mt-6 font-normal font-rubik">
            {t("why-us-heading")}
          </p>

          {/* Features Section */}
          <div className="flex gap-6 mt-16 font-baloo">
            {/* Steps Line */}
            <div className="flex flex-col items-center">
              {features.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div className=" z-10 flex items-center justify-center w-[60px] h-[60px] bg-flame text-cloudy rounded-full font-medium text-xs font-baloo">
                    {step.steps.toString().padStart(2, "0")}
                  </div>
                  {index < features.length - 1 && (
                    <div className="w-px md:h-16 h-28 border-r border-dotted border-gray-400 my-1"></div>
                  )}
                </div>
              ))}
            </div>

            {/* Feature Item */}
            <div className="flex flex-col gap-8 self-center">
              {features.map((feature) => (
                <div className="flex flex-col" key={feature.id}>
                  <div className="font-bold text-base text-foreground mb-2">{feature.title}</div>
                  <p className="text-foreground text-base font-normal font-rubik leading-7">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Images Section */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-3">
            {/* First Column */}
            <img
              src={whyus4}
              alt="Fitness Training"
              loading="lazy"
              className="w-full h-[378px] rounded-2xl object-cover"
            />
            <img
              src={whyus3}
              alt="Gym Equipment"
              loading="lazy"
              className="w-full h-[344px] rounded-2xl object-cover"
            />
          </div>

          {/* Second Column */}
          <div className="space-y-4 self-center">
            <img
              src={whyus2}
              alt="Fitness Workout"
              loading="lazy"
              className="w-full h-72 rounded-2xl object-cover"
            />
            <img
              src={whyus1}
              alt="Personal Training"
              loading="lazy"
              className="w-full h-[346px] rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
