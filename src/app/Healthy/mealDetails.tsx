import { getMealDetails } from "@/lib/apis/meals.api";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import MealsList from "./meals-list";
import type { MealDetails as MealDetailsType } from "@/lib/types/meals";
import PagesLoader from "@/components/common/pages-loader/pages-loader";
import { Play } from "lucide-react";

export default function MealDetails({ i }: { i: string }) {
  const { t } = useTranslation();

  const [selectedMealId, setSelectedMealId] = useState<string>(i);
  const [meal, setMeal] = useState<MealDetailsType | null>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const [hideVideoOnMobile, setHideVideoOnMobile] = useState(false);
  const hasVideo = !!videoUrl;

  useEffect(() => {
    if (videoUrl) {
      const videoId = videoUrl.split("embed/")[1];
      setImgSrc(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`);
      setIsPlaying(false);
    }
  }, [videoUrl]);

  useEffect(() => {
    getMealDetails(selectedMealId)
      .then((data) => {
        const mealData = data.meals[0];
        setMeal(mealData);
        setVideoUrl(mealData.strYoutube?.replace("watch?v=", "embed/") || "");
        setHideVideoOnMobile(false); // reset visibility when meal changes
      })
      .catch((error) => {
        console.error("Error fetching meals:", error);
      });
  }, [selectedMealId]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 md:gap-4 relative">
      {/* Left Section: Tabs and Meal List */}
      <div className="col-span-1 lg:col-span-2 min-h-96 md:max-w-[409px] border-2 border-graphite rounded-3xl mx-auto">
        {meal ? (
          <Tabs defaultValue={meal.strCategory} className="w-full text-center font-baloo">
            <TabsList className="bg-transparent flex flex-wrap justify-center gap-6 mt-5 mb-7">
              <TabsTrigger value="Breakfast">{t("breakfast")}</TabsTrigger>
              <TabsTrigger value="Chicken">{t("chicken")}</TabsTrigger>
              <TabsTrigger value="Beef">{t("beef")}</TabsTrigger>
              <TabsTrigger value="Pasta">{t("pasta")}</TabsTrigger>
              <TabsTrigger value="Seafood">{t("seafood")}</TabsTrigger>
              <TabsTrigger value="Miscellaneous">{t("miscellaneous")}</TabsTrigger>
            </TabsList>

            <TabsContent value="Breakfast">
              <MealsList c="Breakfast" setSelectedMealId={setSelectedMealId} />
            </TabsContent>
            <TabsContent value="Chicken">
              <MealsList c="Chicken" setSelectedMealId={setSelectedMealId} />
            </TabsContent>
            <TabsContent value="Beef">
              <MealsList c="Beef" setSelectedMealId={setSelectedMealId} />
            </TabsContent>
            <TabsContent value="Pasta">
              <MealsList c="Pasta" setSelectedMealId={setSelectedMealId} />
            </TabsContent>
            <TabsContent value="Seafood">
              <MealsList c="Seafood" setSelectedMealId={setSelectedMealId} />
            </TabsContent>
            <TabsContent value="Miscellaneous">
              <MealsList c="Miscellaneous" setSelectedMealId={setSelectedMealId} />
            </TabsContent>
          </Tabs>
        ) : (
          <PagesLoader />
        )}
      </div>

      {/* Right Section: Video */}
      {!hideVideoOnMobile && (
        <div className="col-span-4 min-h-96 absolute top-0 inset-x-0 md:flex flex-col md:static">
          {!hasVideo ? (
            <div className="w-full h-[536px] rounded-t-3xl flex items-center justify-center bg-charcoal text-cloudy text-xl font-bold">
              <button
                onClick={() => setHideVideoOnMobile(true)}
                className="absolute top-4 right-4 z-20 text-white bg-black/60 px-3 py-1 rounded-md text-sm block md:hidden"
              >
                ✕
              </button>
              {t("this-video-is-not-available")}
            </div>
          ) : !isPlaying ? (
            <div
              className="relative cursor-pointer w-full h-[536px] rounded-t-3xl overflow-hidden"
              onClick={() => setIsPlaying(true)}
            >
              <img
                key={imgSrc}
                src={imgSrc}
                alt="Thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
                <button className="bg-[#FF410066] w-20 h-20 rounded-full flex items-center justify-center">
                  <div className="bg-[#FF410099] w-16 h-16 rounded-full flex items-center justify-center">
                    <div className="bg-flame w-10 h-10 rounded-full flex items-center justify-center">
                      <Play className="w-5 h-6 text-cloudy" fill="#F3F3F4" />
                    </div>
                  </div>
                </button>
              </div>

              {/* ✕ Close Button for mobile */}
              <button
                onClick={() => setHideVideoOnMobile(true)}
                className="absolute top-4 right-4 z-20 text-white bg-black/60 px-3 py-1 rounded-md text-sm block md:hidden"
              >
                ✕
              </button>
            </div>
          ) : (
            <div className="relative">
              <iframe
                src={`${videoUrl}?autoplay=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-[536px] rounded-t-3xl"
              />
              {/* ✕ Close Button for mobile */}
              <button
                onClick={() => setHideVideoOnMobile(true)}
                className="absolute top-4 right-4 z-20 text-white bg-black/60 px-3 py-1 rounded-md text-sm block md:hidden"
              >
                ✕
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
