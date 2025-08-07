import axios from "axios";

export default async function otpCodeAction(resetCode: string) {
    // Base URL
    const baseURL = import.meta.env.VITE_API_URL;

    // Check if API URL is defined
    if (!baseURL) throw new Error("API URL is not defined in .env");

    const { data } = await axios.post(`${baseURL}/auth/verifyResetCode`, { resetCode });

    return data;
}
