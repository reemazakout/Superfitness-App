import AuthStaticSection from "@/components/common/auth-static-section/auth-static-sec";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import useCreateNewPassword from "../../../hooks/use-create-new-password";

export default function CreateNewPasswordStep() {
  //  Translation
  const { t } = useTranslation();

  // Navigate
  const navigate = useNavigate();

  // State
  const [showPassword, setShowPassword] = useState(false);

  // Mutation
  const { createNewPassword, isPending } = useCreateNewPassword();

  // Form & Validation
  const FormSchema = z.object({
    email: z.string({ required_error: t("email-required") }).email({ message: t("email-valid") }),
    newPassword: z
      .string({ required_error: t("password-required") })
      .min(1, { message: t("password-required") })
      .max(20, { message: t("password-max-length") })
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
        message: t("password-regex"),
      }),
  });

  type Inputs = z.infer<typeof FormSchema>;

  const form = useForm<Inputs>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      newPassword: "",
    },
  });

  // Functions
  const onSubmit = async (values: Inputs) => {
    try {
      await createNewPassword(values);
      navigate("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const backEndMessage = error?.response?.data?.error || t("something-went-wrong");
      form.setError("newPassword", { message: backEndMessage });
    }
  };

  // Function to toggle the password visibility
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 ">
      {/* Right section */}
      <div>
        <AuthStaticSection />
      </div>

      {/* left section */}
      <div className="flex flex-col  items-center justify-center">
        {/* Welcome massage */}
        <h2 className=" mb-10 flex flex-col items-center justify-center font-baloo font-normal text-2xl leading-[140%] tracking-none capitalize ">
          <br />
          <span className="text-[48px] font-extrabold">{t("create-new-password")}</span>
        </h2>

        {/* Login form */}
        <div className=" flex justify-center">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="md:min-w[400px] xl:w-[486px]  border border-light-gray rounded-[50px] px-10 pt-10 pb-10 flex flex-col items-center justify-center gap-1"
            >
              <span className="text-2xl font-baloo text-center">
                {t("make-sure-to-create-a-strong-password")}
              </span>

              {/* Email input */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="sr-only">{t("email-placeholder")}</FormLabel>
                    <FormControl>
                      <div className="w-full flex items-center  rounded-full px-4 border border-[#D9D9D9] py-1  h-12">
                        <Mail />
                        <Input
                          autoComplete="email"
                          className="focus:ring-0 focus-visible:ring-0 border-none"
                          placeholder={t("email-placeholder")}
                          {...field}
                        />
                      </div>
                    </FormControl>

                    {/* Backend Error */}
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              {/* Password input */}
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem className="w-full">
                    {/* Password label */}
                    <FormLabel className="sr-only">{t("passwrod-placeholder")}</FormLabel>

                    {/* password field */}
                    <FormControl>
                      <div className="w-full  flex items-center  rounded-full px-4 border border-[#D9D9D9] h-12">
                        <Lock />
                        <Input
                          autoComplete="current-password"
                          className="focus:ring-0 focus-visible:ring-0 border-none"
                          placeholder={t("passwrod-placeholder")}
                          type={!showPassword ? "password" : "text"}
                          {...field}
                        />
                        {!showPassword ? (
                          <Eye onClick={togglePassword} className="cursor-pointer" />
                        ) : (
                          <EyeOff onClick={togglePassword} className="cursor-pointer" />
                        )}
                      </div>
                    </FormControl>

                    {/* Backend Error */}
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                disabled={isPending}
                className="w-full rounded-full h-10 text-white font-baloo font-extrabold text-base bg-flame mt-6"
                type="submit"
              >
                {isPending ? t("verifying") : t("confirm")}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
