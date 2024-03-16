import Button from "./button";
import { NavLink } from "react-router-dom";

const Card = ({ className, src, title, description, id, released }) => {
  return (
    <div className={className} key={id}>
      <figure>
        <img src={src} alt="..." />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>Rating: {description}</p>
        <p>Released: {released}</p>
        <div className="card-actions justify-end">
          <NavLink to={`/add-cart/${id}`} className="btn btn-primary">
            {" "}
            AddGame
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default Card;
