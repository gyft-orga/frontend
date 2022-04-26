import React, { useEffect, useState } from "react";
import Axios from 'axios'
import { useNavigate } from "react-router-dom";
Axios.defaults.withCredentials = true

export function Secret() {
  let navigate = useNavigate();
  const [user, setUser] = useState(null)

  useEffect(() => {
    Axios({
      method: "GET",
      url: "http://localhost:8002/getuser",
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
    withCredentials: true
    }).then(res => {
      setUser(res.data)
    })
      .catch(err => {
        navigate("../login", { replace: true });
      })
  }, [])

  const logout = () => {
    Axios({
      method: "GET",
      url: "http://localhost:8002/auth/logout",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      console.log("res", res)
      navigate("../login", { replace: true });
    });
  }

  return (
    <main>
      {user ?
        <>
          <h2>Secret Place</h2>
          <p>If you are here it is because you are logged in</p>
          <input
            type="button"
            value="LOG OUT"
            onClick={() => logout()}
          />
        </>
        : <p>you can't see this secret cuz u are not logged in</p>
      }
    </main>
  )
}
