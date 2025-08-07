import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step4Schema } from "../../../../lib/schemas/register-form-schema";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { z } from "zod";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MessweightFeedback from "@/components/custom/messsgg-feedback";
import { useTranslation } from "react-i18next";

interface Step4FormProps {
  onSubmit: (data: z.infer<typeof step4Schema>) => void;
  onBack: () => void;
  defaultValues: z.infer<typeof step4Schema>;
}

const Step4Form = ({ onSubmit, onBack, defaultValues }: Step4FormProps) => {
  const { t } = useTranslation();
  const [lang, setLang] = useState("");
  const [selectedWeihgt, setSelectedWeihgt] = useState(defaultValues.weight);
  const minWeihgt = 10;
  const maxWeihgt = 120;

  // Get languweight direction from localStorage
  useEffect(() => {
    const storedLang = localStorage.getItem("lang");
    setLang(storedLang || "en");
  }, []);

  const isRTL = lang === "ar";

  const form = useForm<z.infer<typeof step4Schema>>({
    resolver: zodResolver(step4Schema),
    defaultValues: defaultValues || { weight: 50 },
  });

  // Generate array of visible numbers (only valid weights)
  const getVisibleNumbers = () => {
    const numbers = [];
    for (let i = -2; i <= 2; i++) {
      const weight = selectedWeihgt + i;
      if (weight >= minWeihgt && weight <= maxWeihgt) {
        numbers.push(weight);
      }
    }
    return numbers;
  };

  // Find the index of the selected weight in the visible array
  const getSelectedIndex = () => {
    const visibleNumbers = getVisibleNumbers();
    return visibleNumbers.findIndex((weight) => weight === selectedWeihgt);
  };

  const handleNumberClick = (weight: number) => {
    setSelectedWeihgt(weight);
    form.setValue("weight", weight);
  };

  const getNumberStyle = (weight: number, isSelected: boolean) => {
    if (isSelected) {
      return {
        fontSize: "4rem",
        fontWeight: "700",
        color: "#FF4500",
        opacity: 1,
        transform: "scale(1)",
        cursor: "pointer",
      };
    }
    // Calculate distance from selected for styling
    const visibleNumbers = getVisibleNumbers();
    const selectedIndex = getSelectedIndex();
    const currentIndex = visibleNumbers.findIndex((n) => n === weight);
    const distance = Math.abs(currentIndex - selectedIndex);

    if (distance === 1) {
      return {
        fontSize: "2.5rem",
        fontWeight: "600",
        color: "#9CA3AF",
        opacity: 0.8,
        transform: "scale(0.8)",
        cursor: "pointer",
      };
    } else {
      return {
        fontSize: "1.8rem",
        fontWeight: "500",
        color: "#6B7280",
        opacity: 0.5,
        transform: "scale(0.6)",
        cursor: "pointer",
      };
    }
  };
  const handlePrevious = () => {
    if (selectedWeihgt > minWeihgt + 5) {
      setSelectedWeihgt(selectedWeihgt - 5);
      form.setValue("weight", selectedWeihgt);
    } else {
      setSelectedWeihgt(minWeihgt);
      form.setValue("weight", minWeihgt);
    }
  };

  const handleNext = () => {
    if (selectedWeihgt < maxWeihgt - 5) {
      setSelectedWeihgt(selectedWeihgt + 5);
      form.setValue("weight", selectedWeihgt);
    } else {
      setSelectedWeihgt(maxWeihgt);
      form.setValue("weight", maxWeihgt);
    }
  };

  const getIndicatorPosition = () => {
    const visibleNumbers = getVisibleNumbers();
    const selectedIndex = getSelectedIndex();
    const totalNumbers = visibleNumbers.length;
    const numberSpacing = 92; // Approximate spacing between numbers

    let offset = 0;

    if (totalNumbers === 1) {
      offset = 0;
    } else if (totalNumbers === 2) {
      offset = selectedIndex === 0 ? -46 : 46;
    } else if (totalNumbers === 3) {
      offset = (selectedIndex - 1) * numberSpacing;
    } else if (totalNumbers === 4) {
      offset = [-138, -46, 46, 138][selectedIndex];
    } else if (totalNumbers === 5) {
      offset = (selectedIndex - 2) * numberSpacing;
    }

    // Reverse the offset for RTL
    return isRTL ? -offset : offset;
  };

  const visibleNumbers = getVisibleNumbers();
  const indicatorOffset = getIndicatorPosition();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div
          className={`flex flex-col items-center justify-center p-6 ${isRTL ? "rtl" : "ltr"}`}
          dir={isRTL ? "rtl" : "ltr"}
        >
          <div className="mb-8">
            <p className="text-orange-500 text-center mb-6 font-medium">{t("kg")}</p>
            <div className="relative flex items-center justify-center">
              {/* Next button */}
              {isRTL ? (
                <button
                  // Arabic next button
                  type="button"
                  onClick={handleNext}
                  disabled={selectedWeihgt >= maxWeihgt}
                  className="absolute left-[-20px] p-2 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed z-10 transition-opacity duration-200"
                >
                  <ChevronLeft size={24} />
                </button>
              ) : (
                <button
                  // English next button
                  type="button"
                  onClick={handleNext}
                  disabled={selectedWeihgt >= maxWeihgt}
                  className="absolute right-[-30px] p-2 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed z-10 transition-opacity duration-200"
                >
                  <ChevronRight size={24} />
                </button>
              )}

              {/* Numbers carousel */}
              <div
                className="flex items-center justify-center h-24 relative overflow-hidden"
                style={{ width: "500px" }}
              >
                <div
                  className={`flex items-center justify-center ${
                    isRTL ? "space-x-reverse space-x-8" : "space-x-8"
                  }`}
                >
                  {visibleNumbers.map((weight) => (
                    <div
                      key={weight}
                      onClick={() => handleNumberClick(weight)}
                      style={{
                        ...getNumberStyle(weight, weight === selectedWeihgt),
                        lineHeight: "1",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                        minWidth: "60px",
                        willChange: "transform, opacity, color, font-size",
                      }}
                      className="transition-all duration-300 ease-out select-none flex items-center justify-center"
                    >
                      {weight}
                    </div>
                  ))}
                </div>
              </div>
              {/* Previous button */}
              {!isRTL ? (
                <button
                  // English prev button
                  type="button"
                  onClick={handlePrevious}
                  disabled={selectedWeihgt <= minWeihgt}
                  className="absolute left-[-30px] p-2 text-gary-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed z-10 transition-opacity duration-200"
                >
                  <ChevronLeft size={24} />
                </button>
              ) : (
                <button
                  // Arabic prev button
                  type="button"
                  onClick={handlePrevious}
                  disabled={selectedWeihgt <= minWeihgt}
                  className="absolute right-[-30px] p-2 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed z-10 transition-opacity duration-200"
                >
                  <ChevronRight size={24} />
                </button>
              )}
            </div>
            {/* Precisely positioned triangle indicator */}
            <div className="flex justify-center mt-4 relative h-4">
              <div
                className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[16px] border-l-transparent border-r-transparent border-b-orange-500 absolute top-0"
                style={{
                  transform: `translateX(${indicatorOffset}px)`,
                  transition: "transform 300ms ease-out",
                  willChange: "transform",
                }}
              />
            </div>
          </div>
          <MessweightFeedback messageKey={form.formState.errors.weight?.message} />
        </div>

        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">weight</FormLabel>
              <FormControl>
                <Input
                  className="hidden"
                  type="number"
                  placeholder="Enter your weight"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div
          className={` flex justify-center items-center ${
            isRTL ? "space-x-reverse space-x-4" : "space-x-4"
          }`}
        >
          <Button
            type="button"
            className="bg-gray-400 hover:bg-gray-500 transition-colors duration-300 ease-in-out"
            onClick={onBack}
          >
            {isRTL ? (
              <>
                <ChevronRight className="w-4 h-4 mr-2" />
                {t("back")}
              </>
            ) : (
              <>
                <ChevronLeft className="w-4 h-4 mr-2" />
                {t("back")}
              </>
            )}
          </Button>
          <Button className="bg-flame" type="submit">
            {t("next")}
            {isRTL ? (
              <ChevronLeft className="w-4 h-4 ml-2" />
            ) : (
              <ChevronRight className="w-4 h-4 ml-2" />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Step4Form;
