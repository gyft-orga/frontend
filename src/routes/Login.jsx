import React, {useState} from "react";
import { useForm } from "react-hook-form";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export function Login() {
  let navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");

  const onSubmit = data => {
    axios
     .post(
         'http://localhost:8002/auth/login',
         data,
        { credentials: 'include'},
         { headers: { 'Content-Type': 'application/json' }}
      )
     .then(response => {
      navigate("../home", { replace: true });       
      })
     .catch(error => {console.log("login error? ", error)});
 };

  return (
    <main>
      <h2>Login</h2>
       {/* <form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}> */}
       <form onSubmit={handleSubmit((data) => onSubmit(data))}>
        <div>
          <input {...register("username")} placeholder="Username" type="text" />
        </div>
        <div>
          <input {...register("password")} placeholder="Password" type="password" />
        </div>
        <input type="submit" />
        {/* <p>{data}</p> */}
      </form>
    </main>
  );
}
