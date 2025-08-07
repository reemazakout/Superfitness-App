import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step2Schema } from "../../../../lib/schemas/register-form-schema";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { z } from "zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronLeft, ChevronRight, Mars, Venus } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import MessageFeedback from "@/components/custom/messsgg-feedback";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

interface Step2FormProps {
  onSubmit: (data: z.infer<typeof step2Schema>) => void;
  onBack: () => void;
  defaultValues: z.infer<typeof step2Schema>;
}

const Step2Form = ({ onSubmit, onBack, defaultValues }: Step2FormProps) => {
  const [lang, setLang] = useState("");

  const { t } = useTranslation();

  // Form
  const form = useForm<z.infer<typeof step2Schema>>({
    resolver: zodResolver(step2Schema),
    defaultValues: defaultValues,
  });

  // Function to set the value by click on element
  const handlGenderValue = (input: "male" | "female") => {
    form.setValue("gender", input);
  };
  useEffect(() => {
    const storedLang = localStorage.getItem("lang");
    setLang(storedLang || "en");
  }, []);

  const isRTL = lang === "ar";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        {/* Gender */}
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex  items-center justify-center space-x-6"
                >
                  {/* Male input */}
                  <FormItem
                    onClick={() => handlGenderValue("male")}
                    className={`flex border cursor-pointer flex-col rounded-full h-24 w-24  ${
                      field.value === "male" ? "border-flame border" : "border-gray-200"
                    }  items-center justify-center gap-3 transition-colors duration-300 ease-in-out`}
                  >
                    <FormControl>
                      <div className="  flex justify-center  flex-col space-y-2 items-center">
                        {/* Icon */}
                        <Mars className=" text-9xl w-12 h-12 " />
                        {/* Hidden input */}
                        <RadioGroupItem className="hidden" value="male" />
                        {/* Label */}
                        <FormLabel
                          className={cn(
                            "font-semibold  font-baloo text-sm tracking-none leading-140 transition-colors duration-300 ease-in-out",
                            field.value === "male" ? " text-flame" : " text-white"
                          )}
                        >
                          {t("male")}
                        </FormLabel>
                      </div>
                    </FormControl>
                  </FormItem>

                  {/* Female input */}
                  <FormItem
                    className={`cursor-pointer flex border flex-col rounded-full h-24 w-24 ${
                      field.value === "female" ? "border-flame border" : "border-gray-200"
                    }  items-center justify-center gap-3 transition-colors duration-300 ease-in-out`}
                    onClick={() => handlGenderValue("female")}
                  >
                    <FormControl>
                      <div className=" flex justify-center  flex-col space-y-2 items-center">
                        {/* Icon */}
                        <Venus className="text-9xl w-12 h-12" />
                        {/* Hidden input */}
                        <RadioGroupItem className="hidden" value="male" />
                        {/* label */}
                        <FormLabel
                          className={cn(
                            "font-semibold  font-baloo text-sm tracking-none leading-140 transition-colors duration-300 ease-in-out",
                            field.value === "female" ? " text-flame" : " text-white"
                          )}
                        >
                          {t("female")}
                        </FormLabel>
                      </div>
                    </FormControl>
                  </FormItem>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
        <MessageFeedback messageKey={form.formState.errors.gender?.message} />

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

export default Step2Form;
