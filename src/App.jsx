import React, { Component } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import { Nav } from "./Nav.jsx";

class App extends Component {
  render(){
    return (
      <div>
        <Nav/>
        <Outlet/>
      </div>
    );
  }
}

export default App;
