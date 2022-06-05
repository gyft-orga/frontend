import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GiHamburgerMenu } from "react-icons/gi";
import {  AiFillGift } from "react-icons/ai";
import { PatchQuestionFill } from "@styled-icons/bootstrap/PatchQuestionFill";

export function MyGifts() {
  const navigate = useNavigate();
  const [ user, setUser ] = useState( null );
  const [ giftData, setGiftData ] = useState( null );

  useEffect( () => {
    Axios( {
      method : "GET",
      url    : "http://localhost:8002/myGifts",
      headers: {
        "Content-Type": "application/json",
      },
    } ).then( res => {
      setGiftData( res.data );
    } )
      .catch( err => {
        console.log( "err:", err.response );
      } );
  }, [] );

  return (
    <main>
      <h1>My Gifts</h1>
    </main>
  );
}
