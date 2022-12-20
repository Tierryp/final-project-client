import React, { useState } from "react";
import UsersChatList from "../../components/UserChatList";
import Chat from "./components/Chat";
import UserSearch from "./components/UserSearch";

export default function Home() {
  const [searchKey, setSearchKey] = useState("");
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
      <div>
        <Chat />
      </div>
    </div>
  );
}
