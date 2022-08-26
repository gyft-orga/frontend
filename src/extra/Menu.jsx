import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export function Menu({ changeMenu }) {
  const navigate = useNavigate();

  const CloseIconWrapper = styled.div`
    justify-content: right;
    display: flex;
  `;

  const OptionsWrapper = styled.div`
    margin-left: 20px;
  `;

  const MenuOption = styled.p`
  width: min-content;
`;

  return (
    <>
      <CloseIconWrapper >
        <IoMdClose onClick={() => changeMenu()} />
      </CloseIconWrapper>
      <OptionsWrapper>
        <MenuOption onClick={() => navigate(`../menu/settings`)}>Settings</MenuOption>
        <MenuOption onClick={() => navigate("../menu/policy")}>Privacy Policy</MenuOption>
        <MenuOption onClick={() => navigate("../menu/about")}>About</MenuOption>
        <MenuOption onClick={() => navigate("../menu/donate")}>Donate</MenuOption>
      </ OptionsWrapper>
    </>
  );
}