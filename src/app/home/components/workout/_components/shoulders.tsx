import { useEffect, useState } from "react";
import WorkoutCarousel from "./workout-carousel";
import { getPrimeMoverMuscleByID } from "@/lib/apis/random-prime-mover.api";
import type { Muscle } from "@/lib/types/muscles";
import PagesLoader from "@/components/common/pages-loader/pages-loader";

export default function Shoulders() {
  // State variables
  const [muscleArray, setMuscleArray] = useState<Muscle[] | null>(null);
  const language = localStorage.getItem("lang") || "en";
  const shouldersId = "67c79f3526895f87ce0aa96e";

  useEffect(() => {
    getPrimeMoverMuscleByID(shouldersId, language)
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
