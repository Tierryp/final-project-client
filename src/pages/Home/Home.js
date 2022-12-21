import React, { useEffect, useState } from "react";
import UsersChatList from "./components/UserList";
import Chat from "./components/Chat";
import UserSearch from "./components/UserSearch";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
const socket = io("http://localhost:3001");

function Home() {
  // Storing the socket in a variable

  const [searchKey, setSearchKey] = useState("");
  const { selectedChat, user } = useSelector((state) => state.userReducer);

  useEffect(() => {
    // This will be used to join a specific room
    if (user) {
      socket.emit("join-room", user._id);
    }
  }, [user]);

  return (
    <div className="flex gap-5">
      {/*  User search */}
      <div className="w-96">
        <UserSearch searchKey={searchKey} setSearchKey={setSearchKey} />
        <UsersChatList searchKey={searchKey} />
      </div>
      {/* Chat box */}
      {selectedChat && (
        <div className="w-full">
          <Chat socket={socket} />
        </div>
      )}
    </div>
  );
}

export default Home;
