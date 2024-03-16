import { NavLink } from "react-router-dom";

const FormLogin = ({ handleInput, handleSubmit, user, id }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="container border-solid  w-1/5 flex flex-col gap-5 ">
        <h3 className="text-center mt-5">LOGIN</h3>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="email"
            name="email"
            value={user.email}
            onChange={handleInput}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow"
            defaultValue="password"
            name="password"
            value={user.password}
            onChange={handleInput}
          />
        </label>
        <div className=" flex justify-center">
          <button
            className="btn btn-success rounded-full"
            onClick={handleSubmit}
          >
            login
          </button>
        </div>
        <p className="text-center">
          dont have account yet?
          <span>
            <NavLink to="/register" className="link">
              register
            </NavLink>
          </span>
        </p>

        <div className="d-flex justify-center">
          <div id="buttonDiv"></div>
        </div>
      </div>
    </div>
  );
};
export default FormLogin;
