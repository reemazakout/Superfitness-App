import { useEffect, useState } from "react";
import WorkoutCarousel from "./workout-carousel";
import { getPrimeMoverMuscleByID } from "@/lib/apis/random-prime-mover.api";
import type { Muscle } from "@/lib/types/muscles";
import PagesLoader from "@/components/common/pages-loader/pages-loader";

export default function Arm() {
  const [muscleArray, setMuscleArray] = useState<Muscle[] | null>(null);
  const language = localStorage.getItem("lang") || "en";
  const bicepsId = "67c79f3526895f87ce0aa971";
  const tricepsId = "67c79f3526895f87ce0aa976";

  useEffect(() => {
    async function fetchMuscles() {
      try {
        const [bicepsData, tricepsData] = await Promise.all([
          getPrimeMoverMuscleByID(bicepsId, language),
          getPrimeMoverMuscleByID(tricepsId, language),
        ]);

        // Combine both muscle arrays
        const combinedMuscles = [...(bicepsData?.muscles || []), ...(tricepsData?.muscles || [])];

        setMuscleArray(combinedMuscles);
      } catch (error) {
        console.error("Error fetching muscles:", error);
      }
    }

    fetchMuscles();
  }, [language]);

  if (!muscleArray) {
    return <PagesLoader />;
  }

  return <WorkoutCarousel muscle={muscleArray} />;
}
