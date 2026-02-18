import API from "./api";

export const loginUser = (data:any) => API.post("/auth/login", data);
export const registerUser = (data:any) => API.post("/auth/register", data);
export const getProfile = () => API.get("/auth/me");
