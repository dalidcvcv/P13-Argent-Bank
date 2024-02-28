import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api/v1";
const api = axios.create({ baseURL: API_BASE_URL });

// Authentification de l'user
export const authenticateUser = (email, password) => {
	return api.post("/user/login", { email, password });
};

// Récupèration des inforamtions de l'user
export const getUserProfile = async (token) => {
	return api.post(
		"/user/profile",
		{},
		{ headers: { Authorization: `Bearer ${token}` } }
	);
};

// Màj des informations de l'user
export const changeUserProfile = async (userData, token) => {
	return api.put("/user/profile", userData, {
		headers: { Authorization: `Bearer ${token}` },
	});
};
