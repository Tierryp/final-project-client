import { configureStore } from "@reduxjs/toolkit";

import loaderReducer from "./loaderSlice";
import userReducer from "./userSlice"

//Allows us to  use our reducers inside our index.js kinda like a middleman that holds all our reducers and or actions.
const store = configureStore({
  reducer: {
    loaderReducer,
    userReducer,
  },
});


export default store