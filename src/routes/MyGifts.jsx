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

  return (
    <main>
      <h1>My Gifts</h1>
    </main>
  );
}
