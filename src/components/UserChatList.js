import React from "react";
import { useSelector } from "react-redux";


function UsersChatList({ searchKey }) {
  const { allUsers } = useSelector((state) => state.userReducer);
 

  return (
    <div className="flex flex-col gap-3 md-5">
      {allUsers
        .filter((User) => {
          return User.name.toLowerCase().includes(searchKey.toLowerCase()) && searchKey
        })

        .map((userObj) => {
          return (
            <div className="shadow-sm border p-5 rounded-2xl bg-white">
              <div className="flex gap-5 items-center">
                {userObj.profilePic && (
                  <img
                    src={userObj.profilePic}
                    alt="profilepic"
                    className="w-10 h-10 rounded-full"
                  />
                )}
                {!userObj.profilePic && (
                  <div className="bg-gray-500 rounded-full h-10 w-10 flex items-center justify-center">
                    <h1 className="uppercase text-2xl font-semibold text-white ">
                      {userObj.name[0]}
                    </h1>
                  </div>
                )}

                <h1>{userObj.name}</h1>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default UsersChatList;
