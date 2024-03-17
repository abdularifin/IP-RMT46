import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
      const response = await axios.get(
        "https://branded-things.gj6767.site/cart",
        {
          headers,
        }
      );

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
        "https://branded-things.gj6767.site/delete-cart/" + id,
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
        `https://branded-things.gj6767.site/update-cart/${id}`,
        { rent: getRent },
        { headers }
      );
    } catch (error) {
      console.log(error);
    }
  };
};
export const buyGame = (nav) => {
  return async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const responseMidtrans = await axios.post(
        "https://branded-things.gj6767.site/generate-midtrans-token",
        {},
        { headers }
      );

      window.snap.pay(responseMidtrans.data.token, {
        onSuccess: async function (result) {
          await axios.post(
            "https://branded-things.gj6767.site/add-game",
            {},
            {
              headers,
            }
          );
          nav("/myGame");
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export default cartSlice.reducer;
