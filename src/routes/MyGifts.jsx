import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export function MyGifts() {
  const navigate = useNavigate();
  const [ giftData, setGiftData ] = useState( null );

  const GiftPreview = styled.img`
  width: 80%;
  height: 80%;
`;

  useEffect( () => {
    Axios( {
      method : "GET",
      url    : "http://localhost:8002/my-gifts",
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

  function priorityCondition( priority ) {
    console.log( "priority", priority );
    if ( priority === "1" )
      return <p>Must Have</p>;
    else if ( priority === "2" )
      return <p>I'd like</p>;
    else
      return <p>Maybe</p>;

  }

  return (
    <main>
      <h1>My Gifts</h1>
      <p onClick={() => navigate( "../createGift", { replace: true } )}>Add a Gift</p>
      {console.log( "giftData:", giftData )}
      {giftData && giftData.map( gift => {
        return (
          <>
            <p>------</p>
            <h2>{gift.title}</h2>
            <p>{gift.description}</p>
            <p>{gift.priority}</p>
            {priorityCondition( gift.priority )}
            <img src={gift.imageURL} />
            {/* <GiftPreview src={gift.imageURL} /> */}
            <h3>{gift.claimed_by}</h3>


          </>
        );
      } )}
    </main>
  );
}
