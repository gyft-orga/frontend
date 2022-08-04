import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export function Profile() {
  const [ user, setUser ] = useState( null );
  const navigate = useNavigate();


  useEffect( () => {
    Axios( {
      method : "GET",
      url    : "http://localhost:8002/getuser",
      headers: {
        "Content-Type": "application/json",
      },
    } ).then( res => {
      setUser( res.data.username );
    } )
      .catch( err => {
        console.log( "err:", err.response.status );
        navigate( "../login", { replace: true } );
      } );
  }, [] );

  const logout = () => {
    Axios({
        method: "GET",
        url: "http://localhost:8002/auth/logout",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => {
        console.log("res", res);
        navigate("../login", { replace: true });
    });
};

  return (
    <main>
      <>
        <h2>My Profile </h2>
        <p>You are user {user}</p>
        <input type="button" value="LOG OUT" onClick={() => logout()} />

      </>
      <p></p>
    </main>
  );
}
