import { axiosInstance } from ".";

export const SendMessage = async (message) => {
  try {
    const response = await axiosInstance.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/messages/new-message`,
      message
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetMessages = async (chatId) => {
  try {
    const response = await axiosInstance.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/messages/get-all-messages/${chatId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
