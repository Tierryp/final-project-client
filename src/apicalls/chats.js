
import { axiosInstance } from ".";

export const GetAllChats = async () => {
  try {
    const response = await axiosInstance.get(
      "http://localhost:3001/api/chats/get-all-chats"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const CreateNewChat = async (members) => {
  try {
    const response = await axiosInstance.post(
      "http://localhost:3001/api/chats/create-new-chat",
      {
        members,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const ClearChatMessages = async (chatId) => {
try {
    const response = await axiosInstance.post(
      "http://localhost:3001/api/chats/clear-unread-messages",
      {
        chat: chatId,
      }
    );
    return response.data
} catch (error) {
    throw error
}


}