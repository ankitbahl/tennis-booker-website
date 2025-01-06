import {useState} from "react";
import axios from "axios";

const useLogin = () => {

  const login = async (authCode: string): Promise<{token: string, email: string}> => {
    try {
      const res = await axios.post(`/login?authcode=${encodeURIComponent(authCode)}`);
      return {token: res.data.refresh_token, email: res.data.email};
    } catch (e) {
      console.error('failed to authenticate!');
      console.error(e);
      window.location.replace('/login');
      throw e;
    }
  };
  return { login }
}

export default useLogin;