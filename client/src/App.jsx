import { useEffect, useState } from "react";

import "./App.css";
import store from "../store";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import Route from "./layout/route";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Provider store={store}>
      <RouterProvider router={Route} />
    </Provider>
  );
}

export default App;
