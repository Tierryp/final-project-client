import React, { useState } from "react";
import UsersChatList from "./components/UserList";
import Chat from "./components/Chat";
import UserSearch from "./components/UserSearch";
import { useSelector } from "react-redux";

export default function Home() {
  const [searchKey, setSearchKey] = useState("");
  const {selectedChat} = useSelector((state) => state.userReducer)
  return (
    <div className="flex gap-5">
      {/*  User search */}
      <div className= "w-96">
        <UserSearch 
          searchKey = {searchKey}
          setSearchKey = {setSearchKey}
        />
    <UsersChatList searchKey= {searchKey} />
      </div>
      {/* Chat box */}
      <div className ="w-full">
       {selectedChat && <Chat />}
      </div>
    </div>
  );
}
