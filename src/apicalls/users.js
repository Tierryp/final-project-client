import { axiosInstance } from ".";
import axios from "axios";

export const LoginUser = async (user) => {
  try {
    const response = await axiosInstance.post(
      "http://localhost:3001/api/users/login",
      user
    );
    return response.data;
  } catch (error) {
    throw error();
  }
};

export const RegisterUser = async (user) => {
  try {
    const response = await axiosInstance.post(
      "http://localhost:3001/api/users/register",
      user
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const GetCurrentUser = async () => {
  try {
    const response = await axiosInstance.get(
      "http://localhost:3001/api/users/get-current-user"
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const GetAllUsers = async () => {
  try {
    const response = await axiosInstance.get(
      "http://localhost:3001/api/users/get-all-users"
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
