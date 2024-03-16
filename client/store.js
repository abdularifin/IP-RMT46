import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./src/feature/game/gameSlice";
import cartReducer from "./src/feature/cart/cartSlice";
import userReducer from "./src/feature/user/userSlice";

export default configureStore({
  reducer: {
    games: gameReducer,
    carts: cartReducer,
    users: userReducer,
  },
});
