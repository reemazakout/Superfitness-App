import { useEffect, useState } from "react";
import WorkoutCarousel from "./workout-carousel";
import { getPrimeMoverMuscleByID } from "@/lib/apis/random-prime-mover.api";
import type { Muscle } from "@/lib/types/muscles";
import PagesLoader from "@/components/common/pages-loader/pages-loader";

export default function Chest() {
  // State variables
  const [muscleArray, setMuscleArray] = useState<Muscle[] | null>(null);
  const language = localStorage.getItem("lang") || "en";
  const chestId = "67c79f3526895f87ce0aa96d";

  useEffect(() => {
    getPrimeMoverMuscleByID(chestId, language)
      .then((data) => {
        setMuscleArray(data.muscles);
        console.log("Fetched prime mover:", data);
      })
      .catch((err) => {
        console.error("API error:", err);
      });
  }, [language]);
  if (!muscleArray) {
    return <PagesLoader />;
  }

  return (
    <>
      <WorkoutCarousel muscle={muscleArray} />
    </>
  );
}
