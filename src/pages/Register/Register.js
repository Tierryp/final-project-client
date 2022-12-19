import React from 'react'
import { useState, useEffect,  } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { RegisterUser } from '../../apicalls/users'
import { HideLoader, ShowLoader } from '../../redux/loaderSlice'


export default function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  })
const dispatch = useDispatch()
  const navigate = useNavigate()
  

  const register = async () => {
    try {
dispatch(ShowLoader())
      const response = await RegisterUser(user)
dispatch(HideLoader())
      if (response.success) {
 toast.success(response.message)
} else {
toast.error(response.message)
}
 } catch(error) {
dispatch(HideLoader())
  toast.error(error.message);
 }
  }


useEffect(() => {
  if (localStorage.getItem("token")) {
    navigate("/");
  }
});

    return (

      <div>
        <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
          <div>
            <Link>
              <img className="w-12" src="./chat-gif.gif" alt="Chat gif" />
            </Link>
          </div>
          <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
         
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Name
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    placeholder="Enter your name"
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Email
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    placeholder="Enter your email"
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Password
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="password"
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    placeholder="Enter your password"
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
              <div className="flex items-center justify-end mt-4">
                <Link
                  to="/login"
                  className="text-sm text-gray-600 underline hover:text-gray-900"
                >
                  Already registered?
                </Link>
                <button
                onClick={register}
                 
                  className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                >
                  Register
                </button>
              </div>
         
          </div>
        </div>
      </div>
    );
}
