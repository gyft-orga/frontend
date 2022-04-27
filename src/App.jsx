import React, { Component, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./App.css";
import { Outlet } from "react-router-dom";
import { Nav } from "./Nav.jsx";
import Axios from "axios";

function App() {
  const { register, handleSubmit } = useForm();
  const [ data, setData ] = useState( "" );

  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
}

export default App;
