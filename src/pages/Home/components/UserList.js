import moment from "moment";
import React from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { CreateNewChat, GetAllChats } from "../../../apicalls/chats";
import { HideLoader, ShowLoader } from "../../../redux/loaderSlice";
import { SetAllChats, SetSelectedChat } from "../../../redux/userSlice";

function UsersChatList({ searchKey }) {
  // Getting our reducers from  Redux
  const { allUsers, allChats, user, selectedChat } = useSelector(
    (state) => state.userReducer
  );

  // Using dispatch.
  const dispatch = useDispatch();
  const createNewChat = async (recipientUser) => {
    try {
      // Starting the loader and hiding it for user exp..
      dispatch(ShowLoader());
      // Async await.. creating a new chat located inside a array using async await..
      const response = await CreateNewChat([user._id, recipientUser]);
      dispatch(HideLoader());
      if (response.success) {
        toast.success(response.message);
        // For understanding it's better that I name it newChat instead of just typing response.data inside of my new array.
        const newChat = response.data;
        //With this if this is successful we have officially created our new chat.
        const updateChats = [...allChats, newChat];
        dispatch(SetAllChats(updateChats));
        dispatch(SetSelectedChat(newChat));
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoader());
      toast.error(error.message);
    }
  };

  const openChat = (recipientUser) => {
    const chat = allChats.find(
      (chat) =>
        // If chat includes current user and recipient user.
        chat.members.map((mem) => mem._id).includes(user._id) &&
        chat.members.map((mem) => mem._id).includes(recipientUser)
    );
    if (chat) {
      dispatch(SetSelectedChat(chat));
    }
  };

  // Will filter through the users and chats to return requireed content only.
  const getData = () => {
    //This will give us all of our chats if the searh key end up being empty.
    if (searchKey === "") {
      return allChats;
    }
      return allUsers.filter((user) => user.name.toLowerCase().includes(searchKey.toLowerCase()))
    }
  

  const getIsSelectedChatOrNot = (userObj) => {
    if (selectedChat) {
      return selectedChat.members.map((mem) => mem._id).includes(userObj._id);
    }
    return false;
  };

  const getLastMsg = (userObj) => {
    // Looping through array to check if there are any current chats before we proceed
    const chat = allChats.find((chat) =>
      chat.members.map((mem) => mem._id).includes(userObj._id)
    );
    if (!chat || !chat.lastMessage) {
      return "";
    } else {
      const lastMessageUser =
        chat?.lastMessage?.sender === user._id ? "You:" : "";
      return (
        <div className="flex justify-between  w-full">
          <h1 className="text-gray-500 text-sm">
            {lastMessageUser} {chat?.lastMessage?.text}
          </h1>
          <h1 className="text-gray-500 text-sm">
            {moment(chat?.lastMessage?.createdAt).format("hh:mm A")}
          </h1>
        </div>
      );
    }
  };

  const getUnreadMessages = (userObj) => {
    // Checking if chat exists
    const chat = allChats.find((chat) =>
      chat.members.map((mem) => mem._id).includes(userObj._id)
    );
    if (chat && chat?.unreadMessages && chat?.lastMessage.sender !== user._id) {
      return (
        <div className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {chat?.unreadMessages}
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col gap-3 md-5 w-96">
      {getData().map((chatObjOrUserObj) => {
        let userObj = chatObjOrUserObj
        
        
        
        //CHECKS IF THIS IS THE CHAT OR NOT 
        if (chatObjOrUserObj.members){
          userObj = chatObjOrUserObj.members.find(
            (mem) => mem._id !== user._id
          )
        }
        return (
          <div
            className={`shadow-sm border p-2  rounded-xl bg-white flex justify-between items-center cursor-pointer w-full
            ${getIsSelectedChatOrNot(userObj) && "border-black border-2"}
            `}
            key={userObj._id}
            onClick={() => openChat(userObj._id)}
          >
            <div className="flex gap-5 items-center ">
              {userObj.profilePic && (
                <img
                  src={userObj.profilePic}
                  alt="profilepic"
                  className="w-10 h-10 rounded-full"
                />
              )}
              {!userObj.profilePic && (
                <div className="bg-gray-500 rounded-full h-10 w-10 flex items-center justify-center">
                  <h1 className="uppercase text-xl font-semibold text-white ">
                    {userObj.name[0]}
                  </h1>
                </div>
              )}
              <div className="flex flex-col gap-1  w-72">
                <div className=" flex gap-1">
                  <h1>{userObj.name}</h1>
                  {getUnreadMessages(userObj)}
                </div>

                <h1 className="text-gray-500 text-sm">{getLastMsg(userObj)}</h1>
              </div>
            </div>
        
            <div onClick={() => createNewChat(userObj._id)}>
              {!allChats.find((chat) =>
                chat.members.map((mem) => mem._id).includes(userObj._id)
              ) && (
                <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                  Chat with {userObj.name}
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default UsersChatList;
