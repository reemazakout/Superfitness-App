import { useMutation } from "@tanstack/react-query";
import otpCodeAction from "../functions/otp-code-action";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export default function useOtpCode() {
    // Translation
    const { t } = useTranslation()

    // Mutation
    const mutate = useMutation({
        mutationFn: (resetCode: string) => otpCodeAction(resetCode),

        onSuccess: (data) => {
            toast.success(data.message || t('success'));;
        },
    });

    return {
        otpCode: mutate.mutateAsync,
        ...mutate,
    };
}
