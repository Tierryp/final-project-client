import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetAllUsers, GetCurrentUser } from "../apicalls/users";
import { HideLoader, ShowLoader } from "../redux/loaderSlice";
import { SetAllChats, SetAllUsers, SetUser } from "../redux/userSlice";
import Logo from "../chat-logo.png";
import { GetAllChats } from "../apicalls/chats";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // This is our new variable we no longer have to declare our state.
  const { user } = useSelector((state) => state.userReducer);
  // const [user, setUser] = useState(null)
  const getCurrentUser = async () => {
    try {
      dispatch(ShowLoader());
      const response = await GetCurrentUser();
      const userResponse = await GetAllUsers()
      const allChatsResponse = await GetAllChats()
      dispatch(HideLoader());
      if (response.success) {
        // Redux allows us to dispatch our state inside our components without us declaring the state.
        dispatch(SetUser(response.data));
        dispatch(SetAllUsers(userResponse.data))
        dispatch(SetAllChats(allChatsResponse.data))
      } else {
        navigate("/login");
        return false;
      }
    } catch (error) {
      dispatch(HideLoader());
      navigate("/login");
    }
  };



  useEffect(() => {
    if (localStorage.getItem("token")) {
      getCurrentUser();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="h-screen w-screen bg-gray-100 p-2">
      {/* Header  */}
      <div className="flex justify-between p-5">
        <div className="flex items-center gap-1">
          <img className="w-10" src={Logo} alt="Chat logo" />
          <h1 className="text-primary-text-2xl uppercase font-bold"> </h1>
        </div>
        <div className="flex gap-1 text-md items-center">
          <i className="ri-user-line"></i>
          <h1 className="underline">{user?.name}</h1>
          <i className="ri-logout-box-r-line m-5 text-xl cursor-pointer"
          onClick={() => {
            localStorage.removeItem("token")
            navigate("/login")
          }}></i>
        </div>
      </div>
      {/* Content (Pages) */}
      <div className="p-5">{children}</div>
    </div>
  );
}
