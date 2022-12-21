import { axiosInstance } from ".";
import axios from "axios";

export const LoginUser = async (user) => {
  try {
    const response = await axiosInstance.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/users/login`,
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
      `${process.env.REACT_APP_BACKEND_URL}/api/users/register`,
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
      `${process.env.REACT_APP_BACKEND_URL}/api/users/get-current-user`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const GetAllUsers = async () => {
  try {
    const response = await axiosInstance.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/users/get-all-users`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
