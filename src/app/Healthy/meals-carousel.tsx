import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Card } from "@/components/ui/card";
import { getMealsByCategory } from "@/lib/apis/meals.api";
import { Button } from "@/components/ui/button";
import { ArrowIconLight } from "@/components/common/right-arrow-icon/ArrowIconRight";
import { useTranslation } from "react-i18next";
import PagesLoader from "@/components/common/pages-loader/pages-loader";
import MealDetails from "./mealDetails";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

// Helper to chunk meals array into groups of 6
function chunkArray<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

export default function MealsCarousel({ c }: { c: string }) {
  const { t } = useTranslation();

  const [meals, setMeals] = useState<Meal[][]>([]);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    getMealsByCategory(c)
      .then((data) => {
        const mealsList = data.meals as Meal[];
        const chunks = chunkArray(mealsList, 6);
        setMeals(chunks);
      })
      .catch((error) => {
        console.error("Error fetching meals:", error);
      });
  }, [c]);

  useEffect(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  if (!meals || meals.length === 0) return <PagesLoader />;
  if (selectedMeal) return <MealDetails i={selectedMeal.idMeal} />;

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex gap-4">
          {meals.map((group, i) => (
            <div key={i} className="embla__slide flex-[0_0_100%] px-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-4">
                {group.map((meal) => (
                  <Card
                    key={meal.idMeal}
                    onClick={() => setSelectedMeal(meal)}
                    className="overflow-hidden cursor-pointer relative"
                  >
                    <img
                      src={meal.strMealThumb}
                      alt={meal.strMeal}
                      className="w-full md:w-[403px] md:h-[398px] object-cover"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-[#00000080] backdrop-blur-lg p-4 text-white text-start">
                      <h3 className="text-xl font-bold">{meal.strMeal}</h3>
                      <Button className="ps-0 text-flame bg-transparent text-xl font-medium transition-all duration-300 hover:text-2xl hover:bg-transparent">
                        {t("explore")}
                        <ArrowIconLight />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-8 space-x-3">
        {meals.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              selectedIndex === index
                ? "bg-flame w-6"
                : "bg-charcoal dark:bg-cloudy hover:bg-flame dark:hover:bg-flame"
            }`}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
