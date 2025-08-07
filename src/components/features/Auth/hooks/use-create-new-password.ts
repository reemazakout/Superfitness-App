import { toast } from "sonner";
import createNewPassword from "../functions/create-New-Password-action";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export default function useCreateNewPassword() {
    // Translation
    const { t } = useTranslation()
    // Mutate
    const mutation = useMutation({
        mutationFn: (fields: CreateNewPasswordFeilds) => createNewPassword(fields),

        onSuccess: (data) => {
            toast.success(data.message || t('success'));
        },
    });

    return {
        createNewPassword: mutation.mutateAsync,
        ...mutation,
    };
}
