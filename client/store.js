import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./src/feature/game/gameSlice";
import cartReducer from "./src/feature/cart/cartSlice";
import userReducer from "./src/feature/user/userSlice";
import myGamesReducer from "./src/feature/myGame/myGameslice";

export default configureStore({
  reducer: {
    games: gameReducer,
    carts: cartReducer,
    users: userReducer,
    myGames: myGamesReducer,
  },
});
