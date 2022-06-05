import React, { useState, useEffect } from "react";
import Axios from 'axios'
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GiHamburgerMenu } from 'react-icons/gi'
import {  AiFillGift } from 'react-icons/ai'

import { PatchQuestionFill } from '@styled-icons/bootstrap/PatchQuestionFill'

export function Home() {
  let navigate = useNavigate();
  const [user, setUser] = useState(null)
  const [flag, setFlag] = useState("username")
  const [giftData, setGiftData] = useState(null)

  useEffect(() => {
    Axios({
      method: "GET",
      url: "http://localhost:8002/getuser",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      setUser(res.data.username)
    })
      .catch(err => {
        console.log("err: ", err.response.status)
        navigate("../login", { replace: true });
      })
  }, [])

  useEffect(() => {
    Axios({
      method: "GET",
      url: "http://localhost:8002/home",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      setGiftData(res.data)
    })
      .catch(err => {
        console.log("err: ", err.response)
      })
  }, [])

  const navigateGifts = () => {
    navigate("../myGifts", { replace: true });

  }

  // const logout = () => {
  //   Axios({
  //     method: "GET",
  //     url: "http://localhost:8002/auth/logout",
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   }).then(res => {
  //     setUser(null)
  //     navigate("../home", { replace: true });
  //   });
  // }

  const changeMode = () => {
    setFlag(flag === "phone" ? "username" : "phone")
  }

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
  `

  const FlexWrapper = styled.div`
  justify-content: center;
  width: 100%;
  display: flex;
  margin: 0;
  `

  const QuestionIcon = styled(PatchQuestionFill)`
  color: black;
  height: 50px;
  width: 50px;
`

  const Input = styled.input`
    width: 90%;
    height: 2rem;
  `

  const SmallText = styled.p`
    font-size: 12px;
  `

  const GiftTextTitle = styled.p`
    font-size: 14px;
    font-style: italic;
    color: purple;
  `

  const Text = styled.p`
  font-size: 14px;
`

  const InputButton = styled.input.attrs({
    type: 'button',
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
`

  return (
    <main>
      <Header>

        <GiHamburgerMenu  />
      <AiFillGift onClick={() => navigateGifts()} />
        {!user ? <p onClick={() => navigate("../login", { replace: true })}>Sign in</p> : <>{user}</>}
      </Header>
      <MainWrapper>
        <Text>Search for your friends {flag === "phone" ? "phone number" : "username"}!</Text>
        <Input placeholder={flag === "phone" ? "phone number" : "username"} />
        <div>
          <SmallText onClick={() => changeMode()}>Search using {flag === "phone" ? "username" : "phone number"} instead</SmallText>
        </div>
        {!user && <p>Sign in to see your gift claim history,
          update your gift preferences and more!</p>}
        <GiftTextTitle>Gifts claimed for you</GiftTextTitle>

        {user && giftData && giftData.filter(gift => gift.owner === user).map((gift, i) => {
          return (
            <>
              <SmallText>{gift.title}</SmallText>
              <Text>{gift.description}</Text>
              <FlexWrapper>
                <InputButton value="Received" />
                <InputButton value="Not Received" />
              </FlexWrapper>
            </>
          )
        })}
        <GiftTextTitle>Gifts you've claimed</GiftTextTitle>

        {user && giftData && giftData.filter(gift => gift.claimed_by === user).map((gift, i) => {
          return (
            <>
              <SmallText>{gift.title}</SmallText>
              <Text>{gift.description}</Text>
              <FlexWrapper>
                <InputButton value="Received" />
                <InputButton value="Not Received" />
              </FlexWrapper>
            </>
          )
        })}
        {user && <>
          <FlexWrapper>
            <QuestionIcon />
            <Text>If, after 30 days, a claimed gift is not received, it can be
              marked as unfulfilled. After 2 unfulfilled gifts, one may get
              a suspension.</Text>
          </FlexWrapper>
        </>}
      </MainWrapper>
    </main>
  )
}
