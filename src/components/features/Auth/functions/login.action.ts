import { API } from "@/lib/constants/api.constant";
import axios from "axios";

export interface LoginForm {
  email: string;
  password: string;
}

export async function loginAction(loginForm: LoginForm) {
  try {
    const response = await axios.post(`${API}/auth/signin`, loginForm);
    return response.data as ApiResponse<LoginResponse>;
  } catch (error: any) {
    console.error("Error in loginAction:", error);
    const errorResponse: ErrorResponse = {
      error: error.response?.data?.error || error.message || "An unknown error occurred",
    };
    throw errorResponse;
  }
}
