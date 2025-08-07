"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step3Schema } from "../../../../lib/schemas/register-form-schema";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { z } from "zod";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MessageFeedback from "@/components/custom/messsgg-feedback";
import { useTranslation } from "react-i18next";

interface Step3FormProps {
  onSubmit: (data: z.infer<typeof step3Schema>) => void;
  onBack: () => void;
  defaultValues: z.infer<typeof step3Schema>;
}

const Step3Form = ({ onSubmit, onBack, defaultValues }: Step3FormProps) => {
  const { t } = useTranslation();
  const [lang, setLang] = useState("");
  const [selectedAge, setSelectedAge] = useState(defaultValues.age);
  const minAge = 10;
  const maxAge = 100;

  // Get language direction from localStorage
  useEffect(() => {
    const storedLang = localStorage.getItem("lang");
    setLang(storedLang || "en");
  }, []);

  const isRTL = lang === "ar";

  const form = useForm<z.infer<typeof step3Schema>>({
    resolver: zodResolver(step3Schema),
    defaultValues: defaultValues,
  });

  // Generate array of visible numbers (only valid ages)
  const getVisibleNumbers = () => {
    const numbers = [];
    for (let i = -2; i <= 2; i++) {
      const age = selectedAge + i;
      if (age >= minAge && age <= maxAge) {
        numbers.push(age);
      }
    }
    return numbers;
  };

  // Find the index of the selected age in the visible array
  const getSelectedIndex = () => {
    const visibleNumbers = getVisibleNumbers();
    return visibleNumbers.findIndex((age) => age === selectedAge);
  };

  const handleNumberClick = (age: number) => {
    setSelectedAge(age);
    form.setValue("age", age);
  };

  const getNumberStyle = (age: number, isSelected: boolean) => {
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
    const currentIndex = visibleNumbers.findIndex((n) => n === age);
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
    if (selectedAge > minAge + 5) {
      setSelectedAge(selectedAge - 5);
      form.setValue("age", selectedAge);
    } else {
      setSelectedAge(minAge);
      form.setValue("age", minAge);
    }
  };

  const handleNext = () => {
    if (selectedAge < maxAge - 5) {
      setSelectedAge(selectedAge + 5);
      form.setValue("age", selectedAge);
    } else {
      setSelectedAge(maxAge);
      form.setValue("age", maxAge);
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
            <p className="text-orange-500 text-center mb-6 font-medium">{t("years-old")}</p>
            <div className="relative flex items-center justify-center">
              {/* Next button */}
              {isRTL ? (
                <button
                  // Arabic next button
                  type="button"
                  onClick={handleNext}
                  disabled={selectedAge >= maxAge}
                  className={
                    "absolute left-[-20px] p-2 text-gray-400 hover:text-white disabled:opacity-30  z-10 transition-opacity duration-200"
                  }
                >
                  <ChevronLeft size={24} />
                </button>
              ) : (
                // English Next button
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={selectedAge >= maxAge}
                  className="absolute right-[-30px] p-2 text-gray-400 hover:text-white disabled:opacity-30  z-10 transition-opacity duration-200"
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
                  {visibleNumbers.map((age) => (
                    <div
                      key={age}
                      onClick={() => handleNumberClick(age)}
                      style={{
                        ...getNumberStyle(age, age === selectedAge),
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
                      {age}
                    </div>
                  ))}
                </div>
              </div>

              {/* Prev button */}
              {!isRTL ? (
                <button
                  // English Prev button
                  type="button"
                  onClick={handlePrevious}
                  disabled={selectedAge <= minAge}
                  className="absolute text-gray-400 left-[-30px] p-2  hover:text-white disabled:opacity-30  z-10 transition-opacity duration-200"
                >
                  <ChevronLeft size={24} />
                </button>
              ) : (
                <button
                  // Arabic prev button
                  type="button"
                  onClick={handlePrevious}
                  disabled={selectedAge <= minAge}
                  className="absolute right-[-30px] p-2 text-gray-400 hover:text-white disabled:opacity-30  z-10 transition-opacity duration-200"
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
          <MessageFeedback messageKey={form.formState.errors.age?.message} />
        </div>

        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Age</FormLabel>
              <FormControl>
                <Input
                  className="hidden"
                  type="number"
                  placeholder="Enter your age"
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

export default Step3Form;
