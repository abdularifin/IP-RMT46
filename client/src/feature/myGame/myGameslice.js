import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  list: [],
};

export const myGamesSlice = createSlice({
  name: "myGames",
  initialState,
  reducers: {
    setmyGames: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setmyGames } = myGamesSlice.actions;

export const fetchMyGames = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get("http://localhost:3000/my-game", {
        headers,
      });
      console.log(response);
      dispatch(setmyGames(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export default myGamesSlice.reducer;
