import HeadingTitle from "@/components/common/headingTitle";
import workout from "../../assets/images/about-us/workout.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { Dumbbell } from "lucide-react";

import FullBody from "../home/components/workout/_components/full-body";
import Arm from "../home/components/workout/_components/arm";
import Shoulders from "../home/components/workout/_components/shoulders";
import Back from "../home/components/workout/_components/back";
import Legs from "../home/components/workout/_components/legs";
import Stomach from "../home/components/workout/_components/stomach";
import Chest from "../home/components/workout/_components/chest";

export default function ClassesPage() {
  // Initialize translation function
  const { t } = useTranslation();

  return (
    <section className="pt-24 text-charcoal bg-cloudy dark:bg-charcoal dark:text-cloudy relative">
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
          <TabsList className="bg-transparent gap-10 mb-6">
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
