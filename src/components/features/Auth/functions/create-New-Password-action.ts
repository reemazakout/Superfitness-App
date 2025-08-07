import axios from "axios";

export default async function createNewPassword(fields: CreateNewPasswordFeilds) {
    // Base URL
    const baseUrl = import.meta.env.VITE_API_URL;

    // Check if API URL is defined
    if (!baseUrl) throw new Error("API URL is not defined in .env");

    const { data } = await axios.put(`${baseUrl}/auth/resetPassword`, fields);
    return data;
}