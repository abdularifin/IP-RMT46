import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  list: [],
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setUsers } = userSlice.actions;

export const register = (getUser) => {
  return async () => {
    try {
      const response = await axios.post(
        "https://branded-things.gj6767.site/register",
        getUser
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const login = (getUser) => {
  return async () => {
    try {
      const response = await axios.post(
        "https://branded-things.gj6767.site/login",
        getUser
      );
      localStorage.setItem("token", response.data.token);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
};

export default userSlice.reducer;
