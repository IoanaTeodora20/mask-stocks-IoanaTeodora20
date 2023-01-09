import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./NavBar";
import Register from "./Register";
import Login from "./Login";
import { Routes, Route } from "react-router-dom";

function App() {


  return (
    <>
      <Navbar />
      <div className="App">
        <div id="title"></div>

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
