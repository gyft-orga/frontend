import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


export function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [ data, setData ] = useState( "" );

  const onSubmit = ( data ) => {
    axios
      .post( "http://localhost:8002/auth/login", data, {
        withCredentials: true,
        headers        : { "Content-Type": "application/json" },
      } )
      .then( ( res ) => navigate( "../home", { replace: true } ) );
  };

  const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 200px;
  `;

  return (
    <main>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit( ( data ) => onSubmit( data ) )}>
        <input {...register( "username" )} placeholder="Username" type="text" />
        <input
          {...register( "password" )}
          placeholder="Password"
          type="password"
        />
        <input type="submit" />
      </Form>

  <p>Don't have an account? <span onClick={() => navigate( "../register", { replace: true } )}>Sign up</span></p>
    </main>
  );
}
