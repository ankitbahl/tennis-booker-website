import React, {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from 'react-router-dom';
import useLogin from "./useLogin.js";
const LoginRedirect = () => {
  const [searchParams] = useSearchParams();
  const [{login}, {user}] = useLogin();

  const navigate = useNavigate();
  useEffect(() => {
    const authCode = searchParams.get('code');
    console.log(authCode);
    if (!authCode) {
      navigate('/login');
    } else {
      login(authCode);
    }
  }, []);

  return <div>
    {user ? user.email : "No user logged in"}
  </div>
}

export default LoginRedirect;