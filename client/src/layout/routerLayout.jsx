import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <hr />
      <div>
        <Outlet />
      </div>
    </div>
  );
};
export default RootLayout;
