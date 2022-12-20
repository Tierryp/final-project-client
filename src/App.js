import {BrowserRouter, Routes, Route} from "react-router-dom"
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { Toaster } from "react-hot-toast"
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import Loader from "./components/Loader";


function App() {
 const {loader} = useSelector(state => state.loaderReducer)
 
  return (
    <div className="">
      <Toaster position="top-center" reverseOrder={true} />
      {loader && <Loader/>}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
            
                <Register />

            }
          />
          <Route
            path="login"
            element={
      
                <Login />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
