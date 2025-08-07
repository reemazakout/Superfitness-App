import AuthStaticSection from "@/components/common/auth-static-section/auth-static-sec";
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
import { Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useForgetPassword from "../../../hooks/use-forget-password";
import { useForgetPasswordContext } from "../../../context/forgget-password-provider";

export default function EnterEmailStep() {
  // Translation
  const { t } = useTranslation();

  // Mutation
  const { forgetPassword, isPending } = useForgetPassword();

  // Context
  const { setEmail, goToStep } = useForgetPasswordContext();

  // Form & Validation
  const schema = z.object({
    email: z.string().email({ message: t("invalid-email-address") }),
  });
  type Inputs = z.infer<typeof schema>;

  const form = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  // Functions
  const onSubmit = async (values: Inputs) => {
    try {
      await forgetPassword(values.email);
      setEmail(values.email);
      goToStep(2);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const backEndMessage = error?.response?.data?.error || t("something-went-wrong");
      form.setError("email", { message: backEndMessage });
    }
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2">
      {/* Right section */}
      <div>
        <AuthStaticSection />
      </div>

      {/* Left section */}
      <div className="flex flex-col items-center justify-center">
        <h2 className="mb-10 text-center font-baloo font-normal text-2xl capitalize">
          <span className="text-[48px] font-extrabold">{t("forget-password")}</span>
        </h2>

        {/* Form */}
        <div className="flex justify-center">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="xl:w-[486px] border border-light-gray rounded-[50px] px-10 pt-10 pb-10 space-y-4"
            >
              <div className="text-2xl font-baloo text-center">{t("enter-your-email")}</div>

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">{t("email-label")}</FormLabel>
                    <FormControl>
                      <div className="flex items-center w-full mb-4 rounded-full px-4 border border-muted-white py-2 h-12">
                        <Mail />
                        <Input
                          className="focus:ring-0 focus-visible:ring-0 border-none"
                          autoComplete="email"
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

              {/* Submit Button */}
              <Button
                disabled={isPending}
                className="w-full rounded-full h-10 text-white font-baloo font-extrabold text-base bg-flame"
                type="submit"
              >
                {isPending ? t("sending") : t("send-otp")}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
