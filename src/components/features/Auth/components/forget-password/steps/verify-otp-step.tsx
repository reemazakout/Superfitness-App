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
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useOtpCode from "../../../hooks/use-otp-code";
import { useForgetPasswordContext } from "../../../context/forgget-password-provider";
import useForgetPassword from "../../../hooks/use-forget-password";

export default function VerifyOtpStep() {
  //Translation
  const { t } = useTranslation();

  // Mutations
  const { otpCode, isPending } = useOtpCode();
  const { forgetPassword } = useForgetPassword();

  // Context
  const { email, goToStep } = useForgetPasswordContext();

  // Form & Validation
  const schema = z.object({
    otp: z
      .string()
      .min(6, t("otp-must-be-6-digits"))
      .max(6, t("otp-must-be-6-digits"))
      .regex(/^\d{6}$/, t("otp-must-contain-only-numbers")),
  });

  type Inputs = z.infer<typeof schema>;

  const form = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      otp: "",
    },
  });

  // Functions
  const onSubmit = async (values: Inputs) => {
    try {
      await otpCode(values.otp);
      goToStep(3);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const backEndMessage = error?.response?.data?.error || t("something-went-wrong");
      form.setError("otp", { message: backEndMessage });
    }
  };

  // Variables
  const otpInputStyle =
    "border-b-2 border-flame focus:border-white outline-none w-9 h-9 text-center text-red-600 bg-transparent shadow-none mx-4 font-baloo text-2xl font-medium text-foreground";

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
              className="xl:w-[486px] border border-light-gray rounded-[50px] px-10 pt-10 pb-10 gap-4"
            >
              <div className="text-2xl font-baloo text-center mb-8">
                {t("enter-the-otp-you-have-received")}
              </div>

              {/* OTP Input */}
              <FormField
                name="otp"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">OTP</FormLabel>
                    <FormControl>
                      <InputOTP {...field} maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} className={otpInputStyle} />
                          <InputOTPSlot index={1} className={otpInputStyle} />
                          <InputOTPSlot index={2} className={otpInputStyle} />
                          <InputOTPSlot index={3} className={otpInputStyle} />
                          <InputOTPSlot index={4} className={otpInputStyle} />
                          <InputOTPSlot index={5} className={otpInputStyle} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

              {/* Submit Button */}
              <Button
                disabled={isPending || !form.formState.isValid}
                className="w-full my-6 rounded-full h-10 text-white font-baloo font-extrabold text-base bg-flame"
                type="submit"
              >
                {isPending ? t("verifying") : t("confirm")}
              </Button>

              {/* Did Not Receive OTP */}
              <div className="text-center font-baloo text-foreground text-base font-normal">
                {t("did-not-receive-verification-code")}
              </div>

              {/* Resend Code Button */}
              <Button
                disabled={isPending}
                type="button"
                onClick={() => email && forgetPassword(email)}
                variant={"link"}
                className="underline text-flame -mt-1 mb-1 mx-auto block font-baloo text-base font-bold"
              >
                {t("resend-code")}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
