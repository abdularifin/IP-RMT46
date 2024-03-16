import { useState } from "react";
import SelectInput from "../components/select";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateCart } from "../feature/cart/cartSlice";

const UpdateCart = () => {
  const [getRent, setRent] = useState("");
  const dispatch = useDispatch();

  const nav = useNavigate();

  const handleInput = (event) => {
    setRent(event.target.value);
  };

  const { id } = useParams();
  const handleEdit = () => {
    dispatch(updateCart(id, getRent));
    nav("/myCart");
  };

  return (
    <div>
      <SelectInput
        handleInput={handleInput}
        handleSubmit={handleEdit}
        getRent={getRent}
      />
    </div>
  );
};

export default UpdateCart;
