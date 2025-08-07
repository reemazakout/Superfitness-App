import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import ForgetPasswordAction from "../functions/forget-password-action";

export default function useForgetPassword() {
    // Mutation
    const mutation = useMutation({
        mutationFn: (email: string) => ForgetPasswordAction(email),

        onSuccess: (data) => {
            toast.success(data.message);
        },
    });

    return {
        forgetPassword: mutation.mutateAsync,
        ...mutation,
    };
}
