import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GetCurrentUser } from '../apicalls/users';
export default function ProtectedRoute({children}) {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
    const getCurrentUser = async () => {
    try {
      const response = await GetCurrentUser()
      if (response.success){
      setUser(response.data)
      } else {
        navigate("/login")
        return false
      }
    } catch (error) {
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
    {children}
    </div>
  )
}




