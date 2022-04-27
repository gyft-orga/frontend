import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();
  const [ user, setUser ] = useState( null );

  useEffect( () => {
    Axios( {
      method : "GET",
      url    : "http://localhost:8002/getuser",
      headers: {
        "Content-Type": "application/json",
      },
    } )
      .then( ( res ) => {
        setUser( res.data.username );
      } )
      .catch( ( err ) => {
        console.log( "err:", err.response.status );
        navigate( "../login", { replace: true } );
      } );
  }, [] );

  const logout = () => {
    Axios( {
      method : "GET",
      url    : "http://localhost:8002/auth/logout",
      headers: {
        "Content-Type": "application/json",
      },
    } ).then( ( res ) => {
      setUser( null );
      navigate( "../home", { replace: true } );
    } );
  };

  return (
    <main>
      <h2>Welcome {user ? <>{user}</> : "stranger"}</h2>
      {user && <input type="button" value="LOG OUT" onClick={() => logout()} />}
    </main>
  );
}
