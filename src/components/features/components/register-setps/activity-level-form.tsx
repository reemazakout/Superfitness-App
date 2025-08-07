import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ACTIVITYlEVEL, step7Schema } from "../../../../lib/schemas/register-form-schema";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // Correct import
import { z } from "zod";
import { useTranslation } from "react-i18next";
import MessageFeedback from "@/components/custom/messsgg-feedback";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Step6FormProps {
  onSubmit: (data: z.infer<typeof step7Schema>) => void;
  onBack: () => void;
  defaultValues?: z.infer<typeof step7Schema>;
  isPending: boolean;
}

const Step6Form = ({ onSubmit, onBack, defaultValues, isPending }: Step6FormProps) => {
  const { t } = useTranslation();
  const [lang, setLang] = useState("");

  const form = useForm<z.infer<typeof step7Schema>>({
    resolver: zodResolver(step7Schema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    const storedLang = localStorage.getItem("lang");
    setLang(storedLang || "en");
  }, []);

  const isRTL = lang === "ar";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="activityLevel"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  dir={isRTL ? "rtl" : "ltr"}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="w-full sm:w-[300px] flex flex-col space-y-1"
                >
                  {ACTIVITYlEVEL.map((level) => (
                    <FormItem
                      key={level}
                      className={`flex cursor-pointer items-center justify-between py-2 px-4 rounded-3xl  h-10 laptop-lg:h-12 ${
                        field.value === level ? "text-flame" : "text-muted-white"
                      } font-bold  backdrop-blur-sm text-base tracking-none leading-140 capitalize bg-light-gray/20 border border-muted-white transition-colors duration-300 ease-in-out gap-3`}
                    >
                      <FormLabel
                        className="grow  cursor-pointer items-center font-normal"
                        htmlFor={level} // ✅ link with RadioGroupItem's id
                      >
                        {t(level)}
                      </FormLabel>

                      <FormControl>
                        <RadioGroupItem
                          className="w-4 h-4 [&_svg]:fill-flame text-flame [&_svg]:w-2 transition-colors duration-300 ease-in-out"
                          value={level}
                          id={level}
                        />
                      </FormControl>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <MessageFeedback messageKey={form.formState.errors.activityLevel?.message} />
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
            {!isPending ? t("finish") : t("submitting")}
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

export default Step6Form;
