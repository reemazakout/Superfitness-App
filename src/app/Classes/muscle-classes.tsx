import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import ExercisesList from "./exercises-list";
import { DIFFICULTY_LEVELS } from "@/lib/constants/muscles.constant";
import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { ArrowIconStraight } from "@/components/common/right-arrow-icon/ArrowIconRight";

export default function MuscleClasses({
  primeMoverMuscleId,
  PrimeMoverMuscleImage,
  MuscleName,
}: {
  primeMoverMuscleId: string;
  PrimeMoverMuscleImage: string;
  MuscleName: string;
}) {
  const { t } = useTranslation();
  const language = localStorage.getItem("lang") || "en";

  const [videoUrl, setVideoUrl] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    if (videoUrl) {
      const videoId = videoUrl.split("embed/")[1];
      setImgSrc(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`);
      setIsPlaying(false);
    }
  }, [videoUrl]);

  return (
    <section className="mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-6 md:gap-4">
        {/* Tabs Difficulty Level Navigation */}
        <div className="col-span-1 lg:col-span-2 min-h-96 md:max-w-[409px] border-2 border-graphite rounded-3xl mx-auto">
          <Tabs defaultValue="Beginner" className="w-full text-center font-baloo">
            <TabsList className="bg-transparent flex justify-center gap-6 mt-5 mb-7">
              <TabsTrigger value="Beginner">{t("beginner")}</TabsTrigger>
              <TabsTrigger value="Intermediate">{t("intermediate")}</TabsTrigger>
              <TabsTrigger value="Advanced">{t("advanced")}</TabsTrigger>
            </TabsList>

            <TabsContent value="Beginner">
              <ExercisesList
                primeMoverMuscleId={primeMoverMuscleId}
                PrimeMoverMuscleImage={PrimeMoverMuscleImage}
                difficultyLevelId={DIFFICULTY_LEVELS.BEGINNER}
                language={language}
                setVideoUrl={setVideoUrl}
              />
            </TabsContent>
            <TabsContent value="Intermediate">
              <ExercisesList
                primeMoverMuscleId={primeMoverMuscleId}
                PrimeMoverMuscleImage={PrimeMoverMuscleImage}
                difficultyLevelId={DIFFICULTY_LEVELS.INTERMEDIATE}
                language={language}
                setVideoUrl={setVideoUrl}
              />
            </TabsContent>
            <TabsContent value="Advanced">
              <ExercisesList
                primeMoverMuscleId={primeMoverMuscleId}
                PrimeMoverMuscleImage={PrimeMoverMuscleImage}
                difficultyLevelId={DIFFICULTY_LEVELS.ADVANCED}
                language={language}
                setVideoUrl={setVideoUrl}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* Video Section */}
        <div className="col-span-4 min-h-96 flex flex-col">
          {!isPlaying ? (
            // Custom Thumbnail
            <div
              className="relative cursor-pointer w-full h-[536px] rounded-t-3xl overflow-hidden"
              onClick={() => setIsPlaying(true)}
            >
              <img
                key={imgSrc}
                src={imgSrc}
                alt="YouTube Thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
                {/* Play Button */}
                <button className="bg-[#FF410066] w-20 h-20 rounded-full flex items-center justify-center">
                  <div className="bg-[#FF410099] w-16 h-16 rounded-full flex items-center justify-center">
                    <div className="bg-flame w-10 h-10 rounded-full flex items-center justify-center">
                      <Play className="w-5 h-6 text-cloudy" fill="#F3F3F4" />
                    </div>
                  </div>
                </button>

                <h4 className="text-5xl font-medium">{MuscleName} Exercise</h4>
              </div>
            </div>
          ) : (
            // Rendered Video
            <iframe
              src={`${videoUrl}?autoplay=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-[536px] rounded-t-3xl"
            />
          )}

          <div className="flex items-center mt-6 justify-between">
            <div className="flex text-base items-center font-bold gap-2">
              <ArrowIconStraight />
              <span>{t("expertly-designed-workout")}</span>
            </div>
            <div className="flex text-base items-center font-bold gap-2">
              <ArrowIconStraight />
              <span>{t("expertly-designed-workout")}</span>
            </div>
            <div className="flex text-base items-center font-bold gap-2">
              <ArrowIconStraight />
              <span>{t("expertly-designed-workout")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
