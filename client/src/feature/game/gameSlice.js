import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  list: [],
};

export const gameSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    setGames: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setGames } = gameSlice.actions;

export const fetchGames = (searchText, filter, currentPage, getSort) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const params = {
        search: searchText,
        genres: filter,
        page: currentPage,
        ordering: getSort,
      };
      const response = await axios.get(
        "https://branded-things.gj6767.site/allGames",
        {
          headers,
          params,
        }
      );

      dispatch(setGames(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const createCart = (getRent, id, nav) => {
  return async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      await axios.post(
        `https://branded-things.gj6767.site/add-cart/${id}`,
        { rent: getRent },
        { headers }
      );
      nav("/");
    } catch (error) {
      console.log(error);
    }
  };
};

export default gameSlice.reducer;
