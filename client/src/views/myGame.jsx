import Navbar from "../components/navbar";
import Card from "../components/card";
import { useEffect, useState } from "react";
import axios from "axios";
import CardEdit from "../components/cardGame";

const MyGame = () => {
  const [getGame, setGame] = useState([]);
  const fetchGame = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get("http://localhost:3000/my-game", {
        headers,
      });
      console.log(response);
      setGame(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchGame();
  }, []);
  return (
    <div>
      <div className="container-sm bg-primary flex flex-wrap justify-center mx-auto w-4/5 border-solid border-2 border-sky-500 rounded-md mt-5 gap-5">
        {getGame.map((el) => (
          <CardEdit
            className="card w-80 bg-base-100 shadow-xl"
            src={el.imageUrl}
            title={el.name}
            released={el.released}
            description={el.rating}
            id={el.id}
          />
        ))}
      </div>
    </div>
  );
};
export default MyGame;
