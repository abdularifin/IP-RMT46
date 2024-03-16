const QueryBar = ({ handleFilter, handleSearch, handleSort, filter, sort }) => {
  return (
    <div className="container-sm-1 mx:auto mt-5 flex flex-wrap justify-center gap-5">
      <div className="join">
        <div>
          <div>
            <input
              className="input input-bordered join-item"
              placeholder="Search"
              onChange={handleSearch}
            />
          </div>
        </div>
        <select
          className="select select-bordered join-item"
          value={filter}
          onChange={handleFilter}
        >
          {Array.from({ length: 100 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              Genres {i + 1}
            </option>
          ))}
        </select>
      </div>
      <div className="join join">
        <button className="btn join-item" value={"name"} onClick={handleSort}>
          up
        </button>
        <button className="btn join-item" value={"-name"} onClick={handleSort}>
          down
        </button>
      </div>
    </div>
  );
};
export default QueryBar;
