import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import useLogin from "./useLogin.js";
const Home = () => {
  const [{login}, {user}] = useLogin();

  const navigate = useNavigate();
  useEffect(() => {
    // const authCode = searchParams.get('code');
    // if (!authCode) {
    //   navigate('/login');
    // } else {
    //   login(authCode);
    // }
  }, []);

  return <div>
    {user ? user.email : "No user logged in"}
  </div>
}

export default Home;