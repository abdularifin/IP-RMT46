import Navbar from "../components/navbar";
import Card from "../components/card";
import QueryBar from "../components/querybar";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../components/pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchGames } from "../feature/game/gameSlice";

const Home = () => {
  const [searchText, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [getSort, setSort] = useState("asc");

  const dispatch = useDispatch();
  const getGame = useSelector((state) => state.games.list);

  useEffect(() => {
    dispatch(fetchGames(searchText, filter, currentPage, getSort));
  }, [searchText, filter, getSort, currentPage]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  const handleFilter = (event) => {
    setFilter(event.target.value);
  };
  const handleSort = (event) => {
    setSort(event.target.value);
  };
  const handlePage = (event) => {
    const buttonValue = event.target.value;
    let newPage = currentPage;

    if (buttonValue === "prev") {
      newPage = currentPage > 1 ? currentPage - 1 : 1;
    } else if (buttonValue === "next") {
      newPage = currentPage + 1;
    } else {
      newPage = parseInt(buttonValue);
    }

    setCurrentPage(newPage);
  };

  return (
    <div>
      <QueryBar
        handleFilter={handleFilter}
        handleSearch={handleSearch}
        handleSort={handleSort}
        filter={filter}
        sort={getSort}
      />
      <div className="container-sm bg-primary flex flex-wrap justify-center mx-auto w-4/5 border-solid border-2 border-sky-500 rounded-md mt-5 gap-5">
        {getGame.map((el) => (
          <Card
            className="card w-80 bg-base-100 shadow-xl"
            id={el.id}
            src={el.imageUrl}
            title={el.name}
            description={el.rating}
            released={el.released}
          />
        ))}
      </div>
      <hr />

      <div className="flex flex-row justify-center">
        <Pagination
          currentPage={currentPage}
          handlePage={handlePage}
          disablePrev={currentPage === 1}
        />
      </div>
    </div>
  );
};
export default Home;
