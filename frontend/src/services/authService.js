import api from "../api/axios";

export const loginUser = async (username, password) => {
  const response = await api.post("api/token/", {
    username,
    password,
  });

  return response.data;
};