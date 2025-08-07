import HeadingTitle from "@/components/common/headingTitle";
import bgworkout from "../../../../assets/images/workout/workoutbg.jpg";
import workout from "../../../../assets/images/about-us/workout.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FullBody from "./_components/full-body";
import { useTranslation } from "react-i18next";
import { Dumbbell } from "lucide-react";
import Chest from "./_components/chest";
import Arm from "./_components/arm";
import Shoulders from "./_components/shoulders";
import Back from "./_components/back";
import Legs from "./_components/legs";
import Stomach from "./_components/stomach";

export default function WorkoutSection() {
  // Initialize translation function
  const { t } = useTranslation();
  return (
    <section
      className="relative"
      style={{
        backgroundImage: `url(${bgworkout})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {/* Blurry Background */}
      <div className="w-full h-1/2 min-h-[414px] bg-[#FFFFFF99] backdrop-blur-md dark:bg-[#24242499] absolute inset-x-0 top-5 md:top-20"></div>

      {/* Workout Section Content */}
      <div className="relative mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col font-baloo md:items-center">
          <img
            src={workout}
            alt="workout text"
            className="w-80 h-16 mt-10 object-contain hidden md:flex"
          />

          <div className="flex items-center gap-2 mt-7 md:-mt-8 capitalize text-base font-bold text-flame ">
            <Dumbbell width={30} height={30} strokeWidth={1.3} />
            {t("fitness-class")}
          </div>
        </div>

        <HeadingTitle className="mt-6 mb-4 text-foreground md:text-center max-w-[637px] mx-auto uppercase">
          {t("transform-your-body-with-our")}
          <span className="text-flame ms-1">{t("upcoming-workouts")}</span>
        </HeadingTitle>

        <Tabs defaultValue="Full Body" className="w-full text-center font-baloo">
          {/* Tabs List */}
          <TabsList className="bg-transparent gap-10">
            <TabsTrigger value="Full Body">{t("full-body")}</TabsTrigger>
            <TabsTrigger value="Chest">{t("chest")}</TabsTrigger>
            <TabsTrigger value="Arm">{t("arm")}</TabsTrigger>
            <TabsTrigger value="Shoulder">{t("shoulder")}</TabsTrigger>
            <TabsTrigger className="hidden md:block" value="Back">
              {t("back")}
            </TabsTrigger>
            <TabsTrigger className="hidden md:block" value="Legs">
              {t("legs")}
            </TabsTrigger>
            <TabsTrigger className="hidden md:block" value="Stomach">
              {t("stomach")}
            </TabsTrigger>
          </TabsList>

          {/* Tabs Content */}
          <TabsContent value="Full Body">
            <FullBody />
          </TabsContent>
          <TabsContent value="Chest">
            <Chest />
          </TabsContent>
          <TabsContent value="Arm">
            <Arm />
          </TabsContent>
          <TabsContent value="Shoulder">
            <Shoulders />
          </TabsContent>
          <TabsContent value="Back">
            <Back />
          </TabsContent>
          <TabsContent value="Legs">
            <Legs />
          </TabsContent>
          <TabsContent value="Stomach">
            <Stomach />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
