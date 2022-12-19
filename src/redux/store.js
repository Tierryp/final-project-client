import { configureStore } from "@reduxjs/toolkit";

import loaderReducer from "./loaderSlice";


//Allows us to  use the loader/function inside our index.js kinda like a middleman.
const store = configureStore({
  reducer: {
    loaderReducer
  },
});


export default store