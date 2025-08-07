import axios from "axios";

export default async function forgetPasswordAction(email: string) {
    // Base URL
    const baseURL = import.meta.env.VITE_API_URL;

    // Check if API URL is defined
    if (!baseURL) throw new Error("API URL is not defined in .env");

    // Send forgot password request
    const { data } = await axios.post(`${baseURL}/auth/forgotPassword`, { email });
    return data;
}
