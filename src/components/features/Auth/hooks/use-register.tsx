import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { registerAction, type RegisterForm } from "../functions/register.action";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export default function useRegister() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { mutate, error, isPending } = useMutation<
    ApiResponse<LoginResponse>, // Success type
    ErrorResponse, // Error type
    RegisterForm // Input type
  >({
    mutationFn: async (data: RegisterForm) => {
      try {
        const response = await registerAction(data);
        if ("error" in response) {
          throw response;
        }
        return response;
      } catch (error) {
        console.error("Error in mutationFn:", error);
        throw error; // Ensure the error is rethrown
      }
    },
    onSuccess: (data: ApiResponse<LoginResponse>) => {
      if (!("error" in data)) {
        toast(t("register-is-successful"));
        navigate("/login");
      }
    },
    onError: (error: ErrorResponse) => {
      console.error("Login error:", error);
    },
  });

  return { register: mutate, error, isPending };
}
