import {useState} from "react";
import axios from "axios";

const useLogin = () => {

  const [user, setUser] = useState();
  const login = async (authCode) => {
    try {
      const res = await axios.post(`/login?authcode=${encodeURIComponent(authCode)}`);
      setUser({token: res.data.access_token, email: res.data.email});
    } catch (e) {
      console.error('failed to authenticate!');
      console.error(e);
      window.location.replace('/login');
    }
  };
  return [
    {login},
    {user}
  ];
}

export default useLogin;