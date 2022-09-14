import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiFillGift } from "react-icons/ai";
import { PatchQuestionFill } from "@styled-icons/bootstrap/PatchQuestionFill";
import { Menu } from "../extra/Menu";
import { BsArrowRightSquareFill } from "react-icons/bs";
import { useForm } from "react-hook-form";

export function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [flag, setFlag] = useState("username");
  const [giftData, setGiftData] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [received, setReceived] = useState(false);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    Axios({
      method: "GET",
      url: "http://localhost:8002/getuser",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(res => {
      setUser(res.data.username);
    })
      .catch(err => {
        console.log("err:", err.response.status);
        navigate("../login", { replace: true });
      });
  }, []);

  useEffect(() => {
    Axios({
      method: "GET",
      url: "http://localhost:8002/home",
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

  const navigateGifts = () => {
    navigate(`../giftProfile/${user}`, { replace: true });
  };

  const changeMode = () => {
    setFlag(flag === "phone" ? "username" : "phone");
  };

  const changeMenu = () => {
    console.log("open menu");
    setShowMenu(!showMenu);
  };

  const receiveGift = (id) => {
    console.log("receive gift");
    Axios({
      method: "PUT",
      url: `http://localhost:8002/receiveGift/${id}`,
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
  };

  const unreceiveGift = (id) => {
    console.log("receive gift");
    Axios({
      method: "PUT",
      url: `http://localhost:8002/unreceiveGift/${id}`,
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
  };

  const onSubmit = async (data) => {
    console.log("search user!!!")
    Axios({
      method: "GET",
      url: `http://localhost:8002/checkUser/username/${data.userTarget}`,
      headers: {
        "Content-Type": "application/json",
      },
    }).then(res => {
      console.log("res", res);
      if (res.data === "success") {
        navigate(`../giftProfile/${data.userTarget}`);
      } else if (res.data === "No results") {

      }
    })
      .catch(err => {
        console.log("err:", err.response.status);
      });
  };

  const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  const MainWrapper = styled.div`
    justify-content: center;
    display: flex;
    align-items: center;
    flex-direction: column;
  `;

  const FlexWrapper = styled.div`
  justify-content: center;
  align-items: center;
  width: 100%;
  display: flex;
  margin: 0;
  position: relative;
  `;

  const QuestionIcon = styled(PatchQuestionFill)`
  color: black;
  height: 20px;
  width: 20px;
`;

  const Input = styled.input`
    width: 90%;
    height: 2rem;
  `;

  const MenuContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #F0EBE3;
  margin: 0;
  left: 0;
  top: 0;
  position: absolute;
  z-index: 1;
`;

  const SmallText = styled.p`
    font-size: 12px;
  `;

  const GiftTextTitle = styled.p`
    font-size: 14px;
    font-style: italic;
    color: purple;
  `;

  const SpanLink = styled.span`
  font-size: 14px;
  color: blue;
`;

  const Text = styled.p`
  font-size: 14px;
`;

const ItalicText = styled.p`
font-size: 14px;
font-style: italic;

`;

  const ArrowIcon = styled.div`
  position: absolute;
  right: 3%;
  margin: 0;
  display: flex;
`;

  const InputButton = styled.input.attrs({
    type: "button",
  })`
  background: #00aec9;
  color: #fff;
  cursor: pointer;
  margin-bottom: 0;
  margin-left: 5px;
  margin-right: 5px;
  border-radius: 5px;
  height: 35px;
  border-color: transparent;
  box-shadow: 0px;
  outline: none;
  transition: 0.15s;
  text-align: center;
  &:active {
    background-color: #f1ac15;
  }
`;

  return (
    <main>
      <Header>
        <div onClick={() => changeMenu()}>
          <GiHamburgerMenu />
        </div>
        <AiFillGift onClick={() => navigateGifts()} />
        {!user ? <p onClick={() => navigate("../login", { replace: true })}>Sign in</p> : <p onClick={() => navigate("../profile", { replace: true })}>{user}</p>}
      </Header>
      {showMenu && <MenuContainer><Menu changeMenu={changeMenu} /></MenuContainer>}
      <MainWrapper>
        <Text>Search for your friends {flag === "phone" ? "phone number" : "username"}!</Text>
        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
          <FlexWrapper>
            <Input {...register("userTarget")} placeholder={flag === "phone" ? "phone number" : "username"} />
            {/* <ArrowIcon onClick={() => onSubmit()}> */}
            <button type="submit" >
              <BsArrowRightSquareFill size={35} />
            </button>
            {/* </ArrowIcon> */}
          </FlexWrapper>
        </form>
        <div>
          <SmallText onClick={() => changeMode()}>Search using {flag === "phone" ? "username" : "phone number"} instead</SmallText>
        </div>
        {!user && <p>Sign in to see your gift claim history,
          update your gift preferences and more!</p>}
        {giftData && giftData.filter(gift => gift.claimedBy !== null).length !== 0
          ? <GiftTextTitle>Gifts claimed for you</GiftTextTitle>
          : <GiftTextTitle onClick={() => navigate("../myGifts", { replace: true })}>None of your gifts have been claimed. Consider sharing your wishlist with family and friends.</GiftTextTitle>}
        {user && giftData && giftData.filter(gift => gift.claimedBy !== null && gift.owner === user).map((gift, i) => {
          return (
            <>
              <SmallText>{gift.title}</SmallText>
              <Text>{gift.description}</Text>
              <FlexWrapper>
                <InputButton onClick={() => !gift.received ? receiveGift(gift._id) : unreceiveGift(gift._id)} value={!gift.received ? "Received" : "Not Received"} />
              </FlexWrapper>
            </>
          );
        })}
        {giftData && giftData.filter(gift => gift.claimedBy === user).length !== 0
          ? <GiftTextTitle>Gifts you've claimed</GiftTextTitle>
          : <GiftTextTitle>You have claimed no gifts</GiftTextTitle>}

        {user && giftData && giftData.filter(gift => gift.claimedBy === user).map((gift, i) => {
          return (
            <>
              <SmallText>{gift.title}</SmallText>
              <Text>{gift.description}</Text>
              <ItalicText>Waiting for confirmation of receipt from {gift.owner}</ItalicText>
            </>
          );
        })}
      </MainWrapper>
    </main>
  );
}
