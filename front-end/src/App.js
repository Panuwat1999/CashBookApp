import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import Routers from "./Routers";
import Navbar from "./Layouts/Navbar";
import Login from "./Views/Login";
import { useLocation, Route, Routes } from "react-router-dom";

export default function App() {
  let location = useLocation();

  return (
    <div>
      <Provider store={store}>
        {location?.pathname === "/" ? (
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        ) : (
          <Navbar>
            <Routers />
          </Navbar>
        )}
      </Provider>
    </div>
  );
}
