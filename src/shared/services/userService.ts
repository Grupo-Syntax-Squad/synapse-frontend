import api from "./api";

export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const createUser = async (userData: any) => {
  const response = await api.post("/users", userData);
  return response.data;
};

export const updateUser = async (userId: number | string, userData: any) => {
  const response = await api.put(`/users/${userId}`, userData);
  return response.data;
};

export const deleteUser = async (userId: number | string) => {
  const response = await api.delete(`/users/${userId}`);
  return response.data;
};

export const getUserById = async (userId: number | string) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};
