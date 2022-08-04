import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";

export function GiftProfile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [giftData, setGiftData] = useState(null);
  const [loggedUser, setLoggedUser] = useState(null);
  const [userParam, setUserParam] = useState(null);

  const GiftPreview = styled.img`
  width: 80%;
  height: 80%;
`;

  useEffect(() => {
    Axios({
      method: "GET",
      url: "http://localhost:8002/getuser",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(res => {
      setLoggedUser(res.data.username);
    })
      .catch(err => {
        console.log("err:", err.response.status);
        navigate("../login", { replace: true });
      });
  }, []);

  useEffect(() => {
    setUserParam(username);
    Axios({
      method: "GET",
      url: `http://localhost:8002/giftProfile/${username}`,
      headers: {
        "Content-Type": "application/json",
      },
    }).then(res => {
      setGiftData(res.data);
    })
      .catch(err => {
        console.log("err:", err.response);
      });
  }, []);


  function claimGift(id) {
    Axios({
      method: "PUT",
      url: `http://localhost:8002/claimGift/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
    }).then(res => {
      console.log("res.data", res.data)
      const newGiftData = [...giftData]
      newGiftData.map((gift, index) => {
        if (gift._id === id) {
          newGiftData[index] = res.data
        }
      })
      setGiftData(newGiftData);
    })
      .catch(err => {
        console.log("err:", err.response);
      });
  }

  function unclaimGift(id) {
    Axios({
      method: "PUT",
      url: `http://localhost:8002/unclaimGift/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
    }).then(res => {
      console.log("res.data", res.data)
      const newGiftData = [...giftData]
      newGiftData.map((gift, index) => {
        if (gift._id === id) {
          newGiftData[index] = res.data
        }
      })
      setGiftData(newGiftData);
    })
      .catch(err => {
        console.log("err:", err.response);
      });
  }

  function priorityCondition(priority) {
    if (priority === "1")
      return <p>Must Have</p>;
    else if (priority === "2")
      return <p>I'd like</p>;
    else
      return <p>Maybe</p>;
  }

  function claimCondition(claimedBy, _id) {
    console.log("claimedBy", claimedBy)
    console.log("_id", _id)

    if (claimedBy === 'undefined') {
      return
    }
    else if (loggedUser !== userParam && claimedBy === loggedUser) {
      console.log("case for: UNCLAIM THIS GIFT")
      return (
        <>
          <button onClick={() => unclaimGift(_id)}>UNCLAIM THIS GIFT</button>
        </>

      )
    }
    else if (loggedUser !== userParam && claimedBy === null) {
      console.log("case for: CLAIM THIS GIFT")
      return (
        <>
          <button onClick={() => claimGift(_id)}>CLAIM THIS GIFT</button>
        </>

      )
    }
    else if (loggedUser !== userParam && claimedBy !== null && claimedBy !== loggedUser) {
      return (
        <p>This gift has been claimed by someone else</p>
      )
    }
  }

  return (
    <main>
      <p onClick={() => navigate("../home")}>BACK</p>
      {loggedUser === userParam ? <h1>My Gifts</h1> : <h1>Gifts of {userParam}</h1>}
      {loggedUser === userParam && <p>These are your own gifts!</p>}
      {loggedUser === userParam && <p onClick={() => navigate("../createGift", { replace: true })}>Add a Gift</p>}
      {giftData && giftData.map(gift => {
        return (
          <>
            <p>------</p>
            <h2>{gift.title}</h2>
            <p>{gift.description}</p>
            <p>{gift.priority}</p>
            {priorityCondition(gift.priority)}
            <img src={gift.imageURL} />
            {/* <GiftPreview src={gift.imageURL} /> */}
            <h3>{gift.claimedBy}</h3>
            <p>{moment(gift.updatedAt).fromNow()}</p>
            {console.log("gift", gift)}
            {claimCondition(gift.claimedBy, gift._id)}
            {loggedUser !== userParam && 
            <button 
            onClick={gift.claimedBy === loggedUser ? () => unclaimGift(gift._id): () => claimGift(gift._id) }>
              {gift.claimedBy === loggedUser ? "Unclaim this gift" : "Claim this gift"}
              </button>}
          </>
        );
      })}
    </main>
  );
}
