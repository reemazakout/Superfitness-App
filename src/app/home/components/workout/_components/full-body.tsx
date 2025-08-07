import { useEffect, useState } from "react";
import WorkoutCarousel from "./workout-carousel";
import { getRandomPrimeMover } from "@/lib/apis/random-prime-mover.api";
import type { Muscle } from "@/lib/types/muscles";
import PagesLoader from "@/components/common/pages-loader/pages-loader";

export default function FullBody() {
  // State variables
  const [muscleArray, setMuscleArray] = useState<Muscle[] | null>(null);
  const language = localStorage.getItem("lang") || "en";

  useEffect(() => {
    getRandomPrimeMover(language)
      .then((data) => {
        setMuscleArray(data.muscles);
        console.log("Fetched prime mover:", data);
      })
      .catch((err) => {
        console.error("API error:", err);
      });
  }, [language]);
  if (!muscleArray) {
    return <PagesLoader/>;
  }

  return (
    <>
      <WorkoutCarousel muscle ={muscleArray} />
    </>
  );
}
