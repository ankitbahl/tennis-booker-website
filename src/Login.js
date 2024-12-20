import React from 'react';
const Login = () => {

  const login = () => {
    window.location.replace(`https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${encodeURIComponent("http://localhost:5000/login-redirect")}&prompt=consent&response_type=code&client_id=710411787393-6oke2o3ae0j2ekq51hqkkdofteneufrl.apps.googleusercontent.com&scope=https://mail.google.com/&access_type=offline`)
  }
  return <div>
    <h2>Login Page</h2>
    <button onClick={login}>Login</button>
    <br/>
  </div>
};

export default Login;
