import React, {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from 'react-router-dom';
import useLogin from "../hooks/useLogin";
import {setUser} from "../helpers/storageHelper";
const LoginRedirect = () => {
  const [searchParams] = useSearchParams();
  const { login } = useLogin();

  const navigate = useNavigate();
  useEffect(() => {
    const authCode = searchParams.get('code');
    if (!authCode) {
      navigate('/login');
    } else {
      login(authCode).then(({ email, token }) => {
        // set token and email to storage
        setUser(email, token);
        navigate('/home');
      });
    }
  }, []);

  return <div>
    {/*{user ? user.email : "No user logged in"}*/}
  </div>
}

export default LoginRedirect;