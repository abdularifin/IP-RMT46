import { useState } from "react";
import FormRegister from "../components/register form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { register } from "../feature/user/userSlice";

const Register = () => {
  const [getUser, setUser] = useState([
    {
      username: "",
      email: "",
      password: "",
    },
  ]);
  const dispatch = useDispatch();
  const handleInput = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setUser({
      ...getUser,
      [key]: value,
    });
  };
  const nav = useNavigate();
  const handleSubmit = () => {
    dispatch(register(getUser));
    nav("/login");
  };
  return (
    <div>
      <FormRegister user={getUser} input={handleInput} submit={handleSubmit} />
    </div>
  );
};
export default Register;
