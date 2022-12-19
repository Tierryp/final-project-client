import { axiosInstance } from ".";
import axios from "axios";

export const LoginUser = async (user) => {
  try {
    const response = await axiosInstance.post("/api/users/login", user);
    return response.data;
  } catch (error) {
    throw error();
  }
};


export const RegisterUser = async (user) => {
  try {
    const response = await axiosInstance.post("/api/users/register", user);
    return response.data;
  } catch (error) {
 return error.response.data
  }
};



export const GetCurrentUser = async () => {
  try {
    const response = await axiosInstance.post("/api/users/get-current-user");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

