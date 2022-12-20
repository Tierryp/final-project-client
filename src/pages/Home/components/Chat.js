import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { GetMessages, SendMessage } from "../../../apicalls/messages";
import { HideLoader, ShowLoader } from "../../../redux/loaderSlice";
import moment from "moment";
import { ClearChatMessages, GetAllChats } from "../../../apicalls/chats";
import { SetAllChats } from "../../../redux/userSlice";
function Chat() {
  const dispatch = useDispatch();
  const [newMessage, setNewMessage] = useState("");
  const { selectedChat, user, allChats } = useSelector(
    (state) => state.userReducer
  );
  const [messages = [], setMessages] = useState([]);
  // We use this map method because members is a objects array because while we find we need to acquire strings but with the UI we need objects.
  const recepientUser = selectedChat.members.find(
    (mem) => mem._id !== user._id
  );

  const sendNewMessage = async () => {
    try {
      dispatch(ShowLoader());
      const message = {
        chat: selectedChat._id,
        sender: user._id,
        text: newMessage,
      };
      const response = await SendMessage(message);
      dispatch(HideLoader());
      if (response.success) {
        setNewMessage("");
      }
    } catch (error) {
      dispatch(HideLoader());
      toast.error(error.message);
    }
  };
  const getMessages = async () => {
    try {
      dispatch(ShowLoader());
      const response = await GetMessages(selectedChat._id);
      dispatch(HideLoader());
      if (response.success) {
        setMessages(response.data);
      }
    } catch (error) {
      dispatch(HideLoader());
      toast.error(error.message);
    }
  };

  const clearUnreadMessages = async () => {
    try {
      dispatch(ShowLoader());
      const response = await ClearChatMessages(selectedChat._id);
      dispatch(HideLoader());
      if (response.success) {
       // After a successful response we will map through all the chats to find the current one we have open
        const updatedChats = allChats.map((chat) => {
          if (chat._id === selectedChat._id) {
        // Chat updates with new data
            return response.data;
          }
          return chat;
        });
        console.log(updatedChats)
        dispatch(SetAllChats(updatedChats));
      }
    } catch (error) {
      dispatch(HideLoader());
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getMessages();
    
    if(selectedChat?.lastMessage?.sender !== user._id){
      clearUnreadMessages()
    }
  }, [selectedChat]);

  return (
    <div className="bg-white h-[75vh] border rounded-2xl w-full flex flex-col justify-between p-5">
      <div>
        {" "}
        <div className="flex gap-5 items-center mb-2">
          {recepientUser.profilePic && (
            <img
              src={recepientUser.profilePic}
              alt="profilepic"
              className="w-10 h-10 rounded-full"
            />
          )}
          {!recepientUser.profilePic && (
            <div className="bg-gray-500 rounded-full h-10 w-10 flex items-center justify-center">
              <h1 className="uppercase text-xl font-semibold text-white ">
               
              </h1>
            </div>
          )}

          <h1 className="uppercase">{recepientUser.name}</h1>
        </div>
        <hr />
      </div>

      <div className="h-[55vh] overflow-y-scroll p-5">
        <div className="flex flex-col gap-2">
          {messages.map((message) => {
            const isCurrentSender = message.sender === user._id;
            return (
              <div className={` flex ${isCurrentSender && `justify-end`}`}>
                <div className="flex flex-col gap-1">
                  <h1
                    className={`${
                      isCurrentSender
                        ? "bg-blue-500 text-white rounded-bl-none"
                        : "bg-gray-300 rounded-tr-none"
                    } p-2 rounded-xl `}
                  >
                    {" "}
                    {message.text}{" "}
                  </h1>
                  <h1 className="text-gray-500 text-sm">
                    {moment(message.createdAt).format("hh:mm A")}
                  </h1>
                </div>
                {isCurrentSender && 
                <i className={`ri-check-double-line text-lg p-1
                ${message.read ? "text-blue-500" : "text-gray-400"}
                
                `}></i>}
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <div className="h-10 rounded-xl border-gray-300 shadow border flex justify-between p-2 items-center">
          <input
            type="text"
            placeholder="Message.."
            className="w-[90%] border-0 h-full rounded-xl focus:border-none"
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            className="pb-2 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={() => sendNewMessage()}
          >
            <i className="ri-send-plane-2-line text-black"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
