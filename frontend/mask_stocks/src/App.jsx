import "./App.css";
import Home from "./Components/Home/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
// import RegisterForm from "./Components/RegisterForm/Register";
// import LoginForm from "./Components/Login/Login";
// import { useState, useEffect } from "react";

import FirstPage from "./Components/FirstPage/FirstPage";
// import Home from "./Components/Home/Home"
import LoginForm from "./Components/Login/Login";
function App() {
  // const [loginState, setLoginState] = useState(null);
  // useEffect(() => {
  //   fetch("http://127.0.0.1:9000/api/user", {
  //     method: "GET",
  //     credentials: "include",
  //   })
  //     .then((response) => response.json())
  //     .then((data) => setLoginState(data));
  // }, []);

  return (
    <Routes>
      <Route path="/" element={<FirstPage />}></Route>
      <Route path="/home" element={<Home />}></Route>
      {/* <Route path="/register" element={<RegisterForm />}></Route> */}
      <Route path="/login" element={<LoginForm />}></Route>
    </Routes>
  );
}

export default App;
