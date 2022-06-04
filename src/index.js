import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import { Login, Register, Secret, Home, CreateGift } from "./routes";

render(
  <BrowserRouter>
    <Routes>
    <Route exact path="login" element={<Login />} />
    <Route exact path="home" element={<Home />} />
        <Route exact path="login" element={<Login />} />
        <Route exact path="register" element={<Register />} />
        <Route exact path="secret" element={<Secret />} />
        <Route exact path="createGift" element={<CreateGift />} />

      <Route exact path="/" element={<App />} />  
      <Route path="*" element={<main>404</main>} />
    </Routes>
  </BrowserRouter>,
  document.querySelector( "#root" )
);
