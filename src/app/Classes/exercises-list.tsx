import { useEffect, useState } from "react";
import type { Exercise } from "@/lib/types/exercises";
import { getExercisesByPrimeMoverMuscle } from "@/lib/apis/random-prime-mover.api";
import Spinner from "@/routes/loadingSpinner";
import { useTranslation } from "react-i18next";
import { Play } from "lucide-react";

interface ClassListProps {
  primeMoverMuscleId: string;
  PrimeMoverMuscleImage: string;
  difficultyLevelId: string;
  language?: string;
  setVideoUrl: (url: string) => void;
}

export default function ExercisesList({
  primeMoverMuscleId,
  PrimeMoverMuscleImage,
  difficultyLevelId,
  language,
  setVideoUrl,
}: ClassListProps) {
  // Initialize translation function
  const { t } = useTranslation();

  const [exerciseList, setExerciseList] = useState<Exercise[]>([]);

  useEffect(() => {
    getExercisesByPrimeMoverMuscle(primeMoverMuscleId, difficultyLevelId, language)
      .then((data) => {
        setExerciseList(data.exercises);
        console.log("Fetched exercises:", data);
        if (data.exercises?.length > 0) {
          const firstVideoUrl = data.exercises[0].short_youtube_demonstration_link?.replace(
            "youtu.be/",
            "www.youtube.com/embed/"
          );

          setVideoUrl(firstVideoUrl);
        }
      })
      .catch((err) => {
        console.error("API error:", err);
      });
  }, [primeMoverMuscleId, difficultyLevelId, language]);
  if (!exerciseList || exerciseList.length === 0) {
    return <Spinner />;
  }

  return (
    <div className="p-4 max-h-screen overflow-auto">
      {exerciseList.map((e) => (
        <div key={e._id} className="p-4 border-b border-[#2D2D2D] shadow-sm grid grid-cols-5">
          {/* Thumbnail */}
          <div className="thumbnail col-span-1">
            <img src={PrimeMoverMuscleImage} alt="Muscle" className="w-[81px] rounded-3xl" />
          </div>

          {/* Content */}
          <div className="content col-span-3">
            <h3 className="text-lg font-medium">{e.exercise}</h3>
            <p>{t("3-groups-15-times")}</p>
          </div>

          {/* Button */}
          <div className="col-span-1 flex items-center justify-center">
            <button
              onClick={() =>
                setVideoUrl(
                  e.short_youtube_demonstration_link.replace("youtu.be/", "www.youtube.com/embed/")
                )
              }
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
