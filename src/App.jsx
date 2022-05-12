import React, { Component, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./App.css";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function App() {
  let navigate = useNavigate();

  const { register, handleSubmit } = useForm();
  const [ data, setData ] = useState( "" );

  useEffect(() => {
    navigate("../home", { replace: true });
  }, [])

  return (
    <div>
      {/* <Nav /> */}
      <Outlet />
    </div>
  );
}

export default App;
