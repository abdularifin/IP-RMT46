import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import TableProduct from "../components/tableProduct";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DeleteCart, buyGame, fetchCart } from "../feature/cart/cartSlice";

const MyCart = () => {
  //   const [getCart, setCart] = useState([]);
  const dispatch = useDispatch();

  const getCart = useSelector((state) => state.carts.list);

  const nav = useNavigate();

  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  const handleDelete = (id) => {
    dispatch(DeleteCart(id));
  };
  const handleBuyGame = async (event) => {
    event.preventDefault();
    dispatch(buyGame());
    nav("/myGame");
  };

  return (
    <div>
      <TableProduct
        data={getCart}
        handleDelete={handleDelete}
        handleBuy={handleBuyGame}
      />
    </div>
  );
};
export default MyCart;
