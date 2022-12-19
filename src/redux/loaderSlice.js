import { createSlice } from "@reduxjs/toolkit";

// Slice is going to be used to show and hide the loader whenever the API is in the processing state.
 const loaderSlice = createSlice({
  // So instead of using "state setState" in every component this makes it universally easier by setting our global functions and global variables to accessed all over the application.

  name: "loader",
 initialState:{
    loader: false
 },
  //Redux Actions
  reducers: {
    ShowLoader: (state) => {
      state.loader = true;
    },
    HideLoader: (state) => {
      state.loader = false;
    },
  },
});

// This allows us to export "loaderSlice" and our actions inside the "loaderSlice" which would be the actions inside the reducers.
export const {ShowLoader, HideLoader} = loaderSlice.actions; 

export default loaderSlice.reducer