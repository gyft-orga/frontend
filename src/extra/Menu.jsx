import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";

export function Menu( { changeMenu } ) {

  const CloseIconWrapper = styled.div`
    justify-content: right;
    display: flex;
    `;

  const OptionsWrapper = styled.div`
    margin-left: 20px;
    `;

  return (
    <>
      <CloseIconWrapper onClick={() => changeMenu()}> <IoMdClose /></CloseIconWrapper>
      <OptionsWrapper>
        <p>Settings</p>
        <p>Privacy Policy</p>
        <p>About</p>
        <p>Donate</p>
      </OptionsWrapper>
    </>
  );
}