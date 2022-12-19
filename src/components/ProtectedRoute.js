import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { GetCurrentUser } from '../apicalls/users';
import { HideLoader, ShowLoader } from '../redux/loaderSlice';
export default function ProtectedRoute({children}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [user, setUser] = useState(null)
    const getCurrentUser = async () => {
    try {
     dispatch(ShowLoader())
      const response = await GetCurrentUser()
     dispatch(HideLoader())
      if (response.success){
      setUser(response.data)
      } else {
        navigate("/login")
        return false
      }
    } catch (error) {
    dispatch(HideLoader())
      navigate("/login")
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
    <div>
   {user?.name}
   {user?.email}
    {children}
    </div>
  )
}




