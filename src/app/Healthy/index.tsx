import HeadingTitle from "@/components/common/headingTitle";
import AnnouncementBar from "@/components/features/announcement-bar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import MealsCarousel from "./meals-carousel";

export default function Healthy() {
  const { t } = useTranslation();
  return (
    <>
      <div className=" relative bg-cloudy dark:bg-charcoal bg-cover bg-center flex flex-col items-center pt-32">
        <img src="/src/assets/images/meals/Healthy.svg" className="mt-3" alt="Healthy" />
        <span className="flex relative items-center  justify-center gap-2">
          <img src="/src/assets/images/meals/Dumble.svg" alt="Dumble" />
          <p className="text-flame text-md font-baloo">{t("healthy-nutritions")}</p>
        </span>
        {/* Heading */}
        <HeadingTitle className="px-6 md:w-1/2 text-foreground text-charcoal dark:text-cloudy text-xl md:text-4xl uppercase my-4 font-bold relative z-10 text-start md:text-center ">
          {t("Fuel-your-fitness-journey-with-customized")}

          <span className="text-flame ms-1">{t("meal-plans")}</span>

          {t("for-you")}
        </HeadingTitle>

        <Tabs defaultValue="Breakfast" className="w-full text-center font-baloo">
          {/* Tabs List */}
          <TabsList className="bg-transparent flex justify-center gap-10 mb-6">
            <TabsTrigger value="Breakfast">{t("breakfast")}</TabsTrigger>
            <TabsTrigger value="Chicken">{t("chicken")}</TabsTrigger>
            <TabsTrigger value="Beef">{t("beef")}</TabsTrigger>
            <TabsTrigger value="Pasta">{t("pasta")}</TabsTrigger>
            <TabsTrigger className="hidden md:block" value="Seafood">
              {t("seafood")}
            </TabsTrigger>
            <TabsTrigger className="hidden md:block" value="Miscellaneous">
              {t("miscellaneous")}
            </TabsTrigger>
          </TabsList>

          {/* Tabs Content */}
          <TabsContent value="Breakfast">
            <MealsCarousel c="Breakfast" />
          </TabsContent>
          <TabsContent value="Chicken">
            <MealsCarousel c="Chicken" />
          </TabsContent>
          <TabsContent value="Beef">
            <MealsCarousel c="Beef" />
          </TabsContent>
          <TabsContent value="Pasta">
            <MealsCarousel c="Pasta" />
          </TabsContent>
          <TabsContent value="Seafood">
            <MealsCarousel c="Seafood" />
          </TabsContent>
          <TabsContent value="Miscellaneous">
            <MealsCarousel c="Miscellaneous" />
          </TabsContent>
        </Tabs>

        <div className="relative w-full">
          <AnnouncementBar />
        </div>
      </div>
    </>
  );
}
