import Navbar from "../components/navbar";
import Card from "../components/card";
import { useEffect, useState } from "react";
import axios from "axios";
import CardEdit from "../components/cardGame";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyGames } from "../feature/myGame/myGameslice";

const MyGame = () => {
  // const [getGame, setGame] = useState([]);
  const getGame = useSelector((state) => state.myGames.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMyGames());
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
