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
import { NavLink } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { useState } from "react";
import useLogin from "../hooks/use-login";

export default function Login() {
  //  Translation
  const { t } = useTranslation();

  // Hooks
  const { login, error, isPending } = useLogin();

  // State

  const [showPassword, setShowPassword] = useState(false);
  // Schema
  const FormSchema = z.object({
    email: z
      .string({ required_error: t("email-required") })
      .min(1, {
        message: t("email-required"),
      })
      .email({ message: t("email-valid") }),
    password: z
      .string({ required_error: t("password-required") })
      .min(1, { message: t("password-required") })
      .max(20, { message: t("password-max-length") })
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
        message: t("password-regex"),
      }),
  });

  //  Form
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Functions
  function onSubmit(data: z.infer<typeof FormSchema>) {
    login(data);
  }

  // Function to toggel the password visibility
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <main>
      <section className="grid grid-cols-1 md:grid-cols-2 ">
        {/* Right section */}
        <div>
          <AuthStaticSection />
        </div>

        {/* left section */}
        <div className="flex flex-col overflow-y-auto items-center justify-center">
          {/* Welcom massage */}
          <h2 className=" mb-10 flex flex-col items-center justify-center font-baloo font-normal text-2xl leading-[140%] tracking-none capitalize ">
            <span className="text-base ">{t("hey-there")}</span>
            <br />
            <span className="text-[48px] font-extrabold">{t("welcom-back")}</span>
          </h2>

          {/* Login form */}
          <div className=" flex justify-center">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="md:min-w[400px] xl:w-[486px]  border border-light-gray rounded-[50px] px-10 pt-16 pb-10 flex flex-col items-center justify-center space-y-4"
              >
                <h3 className=" mb-6 text-center font-baloo text-2xl font-extrabold tracking-none leading-[140%] capitalize">
                  {t("login-0")}
                </h3>

                {/* Back end error massage */}
                {error && <p className="text-red-500 p-2">{error.error}</p>}

                {/* Email input */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel htmlFor="email" className="sr-only">
                        {t("email-label")}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center w-full mb-4 rounded-full px-4 border border-muted-white py-2  h-12">
                          <Mail />
                          <Input
                            id="email"
                            type="email"
                            className="focus:ring-0 focus-visible:ring-0 border-none"
                            autoComplete="email"
                            placeholder={t("email-placeholder")}
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password input */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      {/* Password label */}
                      <FormLabel htmlFor="password" className="sr-only">
                        {t("passwrod-placeholder")}
                      </FormLabel>
                      {/* password field */}
                      <FormControl>
                        <div className="w-full flex items-center  rounded-full px-4 border border-[#D9D9D9] py-2  h-12">
                          <Lock />
                          <Input
                            id="password"
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
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <NavLink
                  to={"/forget-password"}
                  className={
                    "underline self-end font-baloo font-bold leading-[140%] tracking-none text-base text-end text-flame mb-6"
                  }
                >
                  {t("forgot-password")}
                </NavLink>
                <Button className="w-full rounded-full h-10 bg-flame " type="submit">
                  {isPending ? t("loading") : t("login-0")}
                </Button>
                <p>
                  <Trans
                    i18nKey="noAccount"
                    components={{
                      1: <NavLink to={"/register"} className="text-flame" />,
                    }}
                  />
                </p>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </main>
  );
}
