import { API } from "@/lib/constants/api.constant";
import axios from "axios";

export interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rePassword: string;
  gender: string;
  height: number;
  age: number;
  weight: number;
  goal: string;
  activityLevel: string;
}

export async function registerAction(registerFrom: RegisterForm) {
  try {
    const response = await axios.post(`${API}/auth/signup`, registerFrom);
    return response.data as ApiResponse<LoginResponse>;
  } catch (error: any) {
    console.error("Error in register:", error);
    const errorResponse: ErrorResponse = {
      error: error.response?.data?.error || error.message || "An unknown error occurred",
    };
    throw errorResponse;
  }
}
