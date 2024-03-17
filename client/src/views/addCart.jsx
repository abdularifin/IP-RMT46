import { useState } from "react";
import SelectInput from "../components/select";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createCart } from "../feature/game/gameSlice";

const AddCart = () => {
  const [getRent, setRent] = useState("");
  const { id } = useParams();
  const nav = useNavigate();
  const dispatch = useDispatch();

  const handleInput = (event) => {
    setRent(event.target.value);
  };

  const handleSubmit = () => {
    dispatch(createCart(getRent, id, nav));
    // nav("/");
  };

  return (
    <div>
      <SelectInput
        handleInput={handleInput}
        handleSubmit={handleSubmit}
        getRent={getRent}
      />
    </div>
  );
};

export default AddCart;
