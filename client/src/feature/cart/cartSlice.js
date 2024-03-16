import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  list: [],
};

export const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    setCarts: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setCarts } = cartSlice.actions;

export const fetchCart = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.get("http://localhost:3000/cart", {
        headers,
      });

      dispatch(setCarts(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const DeleteCart = (id) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.delete(
        "http://localhost:3000/delete-cart/" + id,
        {
          headers,
        }
      );

      dispatch(fetchCart());
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateCart = (id, getRent) => {
  return async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.put(
        `http://localhost:3000/update-cart/${id}`,
        { rent: getRent },
        { headers }
      );
    } catch (error) {
      console.log(error);
    }
  };
};
export const buyGame = () => {
  return async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const responseMidtrans = await axios.post(
        "http://localhost:3000/generate-midtrans-token",
        {},
        { headers }
      );

      window.snap.pay(responseMidtrans.data.token, {
        onSuccess: async function (result) {
          await axios.post(
            "http://localhost:3000/add-game",
            {},
            {
              headers,
            }
          );
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export default cartSlice.reducer;
