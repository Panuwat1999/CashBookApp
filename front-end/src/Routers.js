import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Views/Home";
import About from "./Views/About";
import DemoRedux from "./Views/DemoRedux";
import Dashboard from "./Views/Dashboard";
import { useSelector } from "react-redux";

export default function Routers() {
  const userlogin = useSelector((state) => state.userlogin.user);
  const navigate = useNavigate();

  return (
    <>
      {userlogin?.login ? (
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/demo" element={<DemoRedux />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      ) : (
        <>{navigate("/")}</>
      )}
    </>
  );
}
