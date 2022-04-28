import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import { Login, Register, Secret, Home } from "./routes";

render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<App />}>
        <Route path="home" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="secret" element={<Secret />} />
      </Route>
      <Route path="*" element={<main>404</main>} />
    </Routes>
  </BrowserRouter>,
  document.querySelector( "#root" )
);
