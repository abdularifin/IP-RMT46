import React from "react";

function Pagination({ currentPage, handlePage, disablePrev }) {
  return (
    <div className="row">
      <div className="btn-group" role="group" aria-label="First group">
        <button
          type="button"
          className="btn btn-outline-secondary"
          value="prev"
          onClick={handlePage}
          disabled={disablePrev}
        >
          prev
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary"
          value="next"
          onClick={handlePage}
        >
          next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
