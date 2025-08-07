import { useEffect, useState } from "react";
import WorkoutCarousel from "./workout-carousel";
import { getPrimeMoverMuscleByID } from "@/lib/apis/random-prime-mover.api";
import type { Muscle } from "@/lib/types/muscles";
import PagesLoader from "@/components/common/pages-loader/pages-loader";

export default function Legs() {
  const [muscleArray, setMuscleArray] = useState<Muscle[] | null>(null);
  const language = localStorage.getItem("lang") || "en";

  useEffect(() => {
    // Array of muscle group IDs for legs
    const muscleGroupIds = [
      "67c79f3526895f87ce0aa96c", // Glutes
      "67c79f3526895f87ce0aa970", // Adductors
      "67c79f3526895f87ce0aa972", // Quadriceps
      "67c79f3526895f87ce0aa973", // Hamstrings
      "67c79f3526895f87ce0aa974", // Abductors
      "67c79f3526895f87ce0aa978", // Calves
    ];

    async function fetchMuscles() {
      try {
        const results = await Promise.all(
          muscleGroupIds.map((id) => getPrimeMoverMuscleByID(id, language))
        );

        const combinedMuscles = results.flatMap((res) => res?.muscles || []);
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
