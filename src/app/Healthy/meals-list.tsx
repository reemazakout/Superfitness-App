import { useEffect, useState } from "react";
import { getMealsByCategory } from "@/lib/apis/meals.api";
import { Play } from "lucide-react";
import { useTranslation } from "react-i18next";
import PagesLoader from "@/components/common/pages-loader/pages-loader";

interface MealsListProps {
  c: string;
  setSelectedMealId: (id: string) => void;
}

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export default function MealsList({ c, setSelectedMealId }: MealsListProps) {
  const { t } = useTranslation();
  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    getMealsByCategory(c)
      .then((data) => {
        setMeals(data.meals || []);
      })
      .catch((err) => {
        console.error("API error:", err);
      });
  }, [c]);

  if (!meals || meals.length === 0) return <PagesLoader />;

  return (
    <div className="p-4 max-h-[696px] overflow-auto mt-24">
      {meals.map((meal) => (
        <div
          key={meal.idMeal}
          className="p-4 border-b border-[#2D2D2D] shadow-sm grid grid-cols-5 gap-2 items-center"
        >
          {/* Thumbnail */}
          <div className="col-span-1">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-[81px] h-[81px] rounded-3xl object-cover"
            />
          </div>

          {/* Content */}
          <div className="col-span-3">
            <h3 className="text-lg font-medium">{meal.strMeal}</h3>
            <p>{t("nutrition-packed-meal")}</p>
          </div>

          {/* Select Button */}
          <div className="col-span-1 flex items-center justify-center">
            <button
              onClick={() => setSelectedMealId(meal.idMeal)}
              className="bg-flame w-6 h-6 rounded-full flex items-center justify-center"
            >
              <Play className="w-3 h-4 text-charcoal" fill="currentColor" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
  
