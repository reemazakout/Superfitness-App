import { lazy, Suspense, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import {
  baseRegisterSchema,
  step2Schema,
  step6Schema,
  step7Schema,
} from "@/lib/schemas/register-form-schema";
import useRegister from "../hooks/use-register";
import FormWrapper from "../../components/register-setps/form-wraper";
import AuthStaticSection from "@/components/common/auth-static-section/auth-static-sec";
import type { RegisterForm } from "../functions/register.action";
import type { z } from "zod";

const Step1Form = lazy(() => import("@/components/features/components/register-setps/user-form"));
const Step2Form = lazy(() => import("@/components/features/components/register-setps/gender-form"));
const Step3Form = lazy(() => import("@/components/features/components/register-setps/age-form"));
const Step4Form = lazy(() => import("@/components/features/components/register-setps/weight-form"));
const Step5Form = lazy(() => import("@/components/features/components/register-setps/height-form"));
const Step6Form = lazy(() => import("@/components/features/components/register-setps/goal-form"));
const Step7Form = lazy(
  () => import("@/components/features/components/register-setps/activity-level-form")
);

export default function RegisterMultiStepForm() {
  // Translation
  const { t } = useTranslation();

  // Hooks
  const { register, error, isPending } = useRegister();

  // States

  // State to manage the current step and form data
  const [step, setStep] = useState(1);

  // Forms
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    rePassword: "",
    gender: undefined,
    height: 150,
    age: 25,
    weight: 50,
    goal: undefined,
    activityLevel: undefined,
  });

  // Handle navigation to the next step
  const handleNext = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  // Handle navigation to the previous step
  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  // Handle final submission
  const handleSubmit = async (data: RegisterForm) => {
    const finalData = { ...formData, ...data };
    const finalResult = baseRegisterSchema.safeParse(finalData);
    // Fial case
    if (!finalResult.success) {
      console.log("Final validation failed:", finalResult.error);
    }
    // Success case
    else {
      register(finalResult.data);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="">
          <AuthStaticSection />
        </div>
        <div className=" flex items-center justify-center p-10">
          <Card className="border-none">
            <CardContent className="max-h-[550px] overflow-y-auto">
              {/* Render the appropriate step */}
              <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
                {step === 1 && (
                  <Step1Form onSubmit={handleNext} defaultValues={formData} error={error?.error} />
                )}

                {/* Stepe 2  gender form */}
                {step === 2 && (
                  <FormWrapper
                    step={step}
                    error={error?.error}
                    title={t("auth-form-title")}
                    description={t("we-need-to-know-your-gender")}
                  >
                    <Step2Form
                      onSubmit={handleNext}
                      onBack={handleBack}
                      defaultValues={{ gender: formData.gender! } as z.infer<typeof step2Schema>}
                    />
                  </FormWrapper>
                )}
                {/* Stepe 3  age form */}
                {step === 3 && (
                  <FormWrapper
                    step={step}
                    error={error?.error}
                    title={t("how-old-are-you")}
                    description={t("auth-form-descreption")}
                  >
                    <Step3Form onSubmit={handleNext} onBack={handleBack} defaultValues={formData} />
                  </FormWrapper>
                )}

                {/* Stepe 4  weight form */}
                {step === 4 && (
                  <FormWrapper
                    step={step}
                    error={error?.error}
                    title={t("what-is-your-weight")}
                    description={t("auth-form-descreption")}
                  >
                    <Step4Form onSubmit={handleNext} onBack={handleBack} defaultValues={formData} />
                  </FormWrapper>
                )}

                {/* Stepe 5  height form */}
                {step === 5 && (
                  <FormWrapper
                    step={step}
                    error={error?.error}
                    title={t("what-is-your-height")}
                    description={t("auth-form-descreption")}
                  >
                    <Step5Form onSubmit={handleNext} onBack={handleBack} defaultValues={formData} />
                  </FormWrapper>
                )}

                {/* Stepe 6  goal form */}
                {step === 6 && (
                  <FormWrapper
                    step={step}
                    error={error?.error}
                    title={t("what-is-your-goal")}
                    description={t("auth-form-descreption")}
                  >
                    <Step6Form
                      onSubmit={handleNext}
                      onBack={handleBack}
                      defaultValues={{ goal: formData.goal! } as z.infer<typeof step6Schema>}
                    />
                  </FormWrapper>
                )}

                {/* Stepe 7  activity level form */}
                {step === 7 && (
                  <FormWrapper
                    step={step}
                    error={error?.error}
                    title={t("your-regular-physical-act")}
                    description={t("auth-form-descreption")}
                  >
                    <Step7Form
                      onSubmit={(data) =>
                        handleSubmit({
                          ...formData,
                          ...data,
                          gender: formData.gender!,
                          goal: formData.goal!,
                        })
                      }
                      onBack={handleBack}
                      isPending={isPending}
                      defaultValues={
                        { activityLevel: formData.activityLevel! } as z.infer<typeof step7Schema>
                      }
                    />
                  </FormWrapper>
                )}
              </Suspense>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
