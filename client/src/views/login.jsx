import { useState, useEffect } from "react";
import FormLogin from "../components/inputCompobnent";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../feature/user/userSlice";

const LoginPage = () => {
  const [getUser, setUser] = useState([
    {
      email: "",
      password: "",
    },
  ]);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const handleInput = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    setUser({
      ...getUser,
      [key]: value,
    });
  };
  const handleSubmit = () => {
    dispatch(login(getUser));
    nav("/");
  };

  const handleCredentialResponse = async ({ credential }) => {
    try {
      const { data } = await axios.post(
        "https://branded-things.gj6767.site/google-login",
        {
          tokenGoogle: credential,
        }
      );

      localStorage.setItem("token", data.access_token);
      nav("/");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "561585036554-26netalh14kj92bkhlr013cbsmol8e9e.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" } // customization attributes
    );
    // google.accounts.id.prompt(); // also display the One Tap dialog
  }, []);
  return (
    <div>
      <FormLogin
        handleInput={handleInput}
        handleSubmit={handleSubmit}
        user={getUser}
      />
    </div>
  );
};
export default LoginPage;
