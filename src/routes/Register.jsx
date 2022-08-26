import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export function Register() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");
  const [error, setError] = useState(null);

  const onSubmit = (data) => {
    axios
      .post("http://localhost:8002/auth/register", data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log("response in register", response)
        if (response.data.error === 'Empty Fields') {
          setError("Field the fields!")
          return
        }
        if (response.status === 200) {
          navigate("../secret", { replace: true });
        }
      })
      .catch((err) => {
        console.log("error in register", err.data);
        navigate("../register", { replace: true });
      });
  };

  const ErrorText = styled.p`
  color: red;
`;

  return (
    <main>
      <h2>Register</h2>
      {/* <form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}> */}
      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
        <div>
          <input {...register("username")} placeholder="Username" type="text" />
        </div>
        <div>
          <input
            {...register("password")}
            placeholder="Password"
            type="password"
          />
        </div>
        <div>
          <input
            {...register("phoneNumber")}
            placeholder="PhoneNumber"
            type="number"
          />
        </div>
        <div>
          <input {...register("birthday")} placeholder="Birthday" type="date" />
        </div>
        <input type="submit" />
        {/* <p>{data}</p> */}
      </form>
      {error && <ErrorText>{error}</ErrorText>}

      <p>Have an account? <span onClick={() => navigate("../login", { replace: true })}>Sign In</span></p>

    </main>
  );
}
