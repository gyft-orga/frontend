import React, { Component, useState } from "react";
import { useForm } from "react-hook-form";
import { Outlet } from "react-router-dom";
import "./App.css";
import { Nav } from "./Nav.jsx";
import Axios from "axios";


function App() {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");

  Axios({
    method: "GET",
    url: "http://localhost:8002/connect",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
    console.log("we are in client", res.data.message);
  });
  
  return (
    <div>
      <Nav />
      <Outlet />

      <form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
        <div>
          <input {...register("Username")} placeholder="Username" />
        </div>
        <div>
          <input {...register("Password")} placeholder="Password" />
        </div>
        <input type="submit" />
        <p>{data}</p>
      </form>

    </div>
  );
}

export default App;
