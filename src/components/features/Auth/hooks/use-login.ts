import { useMutation } from "@tanstack/react-query";
import { loginAction, type LoginForm } from "../functions/login.action";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
  const navigate = useNavigate();

  const { mutate, error, isPending } = useMutation<
    ApiResponse<LoginResponse>, // Success type
    ErrorResponse, // Error type
    LoginForm // Input type
  >({
    mutationFn: async (data: LoginForm) => {
      try {
        const response = await loginAction(data);
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
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      }
    },
    onError: (error: ErrorResponse) => {
      console.error("Login error:", error);
    },
  });

  return { login: mutate, error, isPending };
}
