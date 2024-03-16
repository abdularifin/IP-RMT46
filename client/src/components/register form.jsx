import { NavLink } from "react-router-dom";

const FormRegister = ({ input, submit, user }) => {
  return (
    <div className="flex flex-col gap-3 justify-center items-center h-screen">
      <h3 className="text-aligin-center">Register</h3>
      <label className="input input-bordered flex items-center gap-2">
        <input
          type="text"
          className="grow"
          name="username"
          value={user.fullName}
          onChange={input}
          placeholder="username"
        />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <input
          type="text"
          className="grow"
          name="email"
          value={user.email}
          onChange={input}
          placeholder="Email"
        />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <input
          type="password"
          className="grow"
          name="password"
          value={user.password}
          onChange={input}
          defaultValue="password"
        />
      </label>
      <button className="btn btn-info rounded-ful " onClick={submit}>
        register
      </button>
      <p>
        do you have on account?
        <span>
          <NavLink to="/login" className="link">
            login
          </NavLink>
        </span>
      </p>
    </div>
  );
};
export default FormRegister;
