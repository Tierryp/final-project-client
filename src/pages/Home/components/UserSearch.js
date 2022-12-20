import React from 'react'


function UserSearch({searchKey, setSearchKey}) {
    return (
      <div className="relative">
        <input
          type="text"
          placeholder="Search Users"
          className="rounded-full w-full border-gray-300 pl-10 text-black h-14"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <i className="ri-search-line absolute top-4 left-4 text-gray-500"></i>
      </div>
    );
}

export default UserSearch