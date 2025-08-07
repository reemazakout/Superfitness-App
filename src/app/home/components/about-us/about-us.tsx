import { Dumbbell, MoveUpRight } from "lucide-react";
import about1 from "@/assets/images/about-us/about3.png";
import about2 from "@/assets/images/about-us/about1.png";
import about3 from "@/assets/images/about-us/about2.png";
import HeadingTitle from "@/components/common/headingTitle";
import workout from "@/assets/images/about-us/workout.png";
import ArrowIconRight from "@/components/common/right-arrow-icon/ArrowIconRight";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function AboutUs() {
  // Translation
  const { t } = useTranslation();

  // Variables
  const features = [
    {
      id: 1,
      title: t("about-us-title-1"),
      description: t("about-us-description-1"),
    },
    {
      id: 2,
      title: t("about-us-title-2"),
      description: t("about-us-description-2"),
    },
    {
      id: 3,
      title: t("about-us-title-3"),
      description: t("about-us-description-3"),
    },
    {
      id: 4,
      title: t("about-us-title-4"),
      description: t("about-us-description-4"),
    },
  ];

  return (
    <section className="px-4 md:px-10 lg:px-20 max-w-[1500px] mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Images Section */}
        <div className="relative order-2 lg:order-1 mt-20">
          <div className="relative h-[500px] md:h-[600px] lg:h-[700px]">
            {/* Main Image */}
            <div className="absolute left-0 top-0 w-[57%] h-[75%] z-10">
              <img
                src={about1}
                alt="Fitness training session"
                loading="lazy"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>

            {/* Secondary Image */}
            <div className="absolute right-0 top-16 md:top-20 w-[40%] h-[30%] z-20">
              <img
                src={about2}
                loading="lazy"
                alt="Gym equipment"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>

            {/* Tertiary Image */}
            <div className="absolute right-0 bottom-0 w-[55%] h-[55%] z-30">
              <img
                src={about3}
                loading="lazy"
                alt="Personal training"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="order-1 lg:order-2 space-y-8">
          {/* Heading */}
          <section>
            <div className="flex flex-col mt-20 font-baloo">
              <img src={workout} alt="workout text" className="w-80 h-16 mt-10 object-contain" />

              <div className="flex items-center gap-2 -mt-8 capitalize text-base font-bold  text-flame">
                <Dumbbell width={30} height={30} strokeWidth={1.3} />
                {t("about-us")}
              </div>
            </div>

            <HeadingTitle className="mt-6 text-foreground">
              {t("empowering-you-to-achieve-goals")}
              <span className="text-flame ms-1">{t("your-fitness")}</span>
            </HeadingTitle>

            <p className="text-foreground text-lg mt-6 font-normal font-rubik">
              {t("about-us-heading")}
            </p>
          </section>

          {/* Features Section */}
          <div className="grid md:grid-cols-2 gap-6 font-baloo">
            {/* First Features Row */}
            {features.slice(0, 2).map((feature) => (
              <div key={feature.id} className="mt-14">
                <div className="flex items-center gap-3">
                  <MoveUpRight size={18} className="text-flame" />
                  <h3 className="font-bold text-base text-foreground mb-4">{feature.title}</h3>
                </div>
                <p className="text-foreground text-lg font-normal">{feature.description}</p>
              </div>
            ))}

            {/* Separator line between rows */}
            <div className="col-span-2 border-t border-gray-300 my-2" />

            {/* Second Features Row */}
            {features.slice(2).map((feature, index) => (
              <div key={index + 2} className="space-y-3 text-foreground">
                <div className="flex items-center gap-3">
                  <MoveUpRight size={18} className="text-orange-600" />
                  <h3 className="font-bold text-base">{feature.title}</h3>
                </div>
                <p className="text-lg font-normal">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Get Started Button */}
          <button className="mt-8 flex items-center pb-0 md:pb-10">
            <Link
              to="/signup"
              className="relative bg-flame text-white px-8 py-3 rounded-full text-lg font-semibold flex items-center font-rubik"
            >
              {t("get-started")}
              <div className="mr-1">
                <ArrowIconRight />
              </div>
            </Link>
          </button>
        </div>
      </div>
    </section>
  );
}
