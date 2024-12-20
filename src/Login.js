import React from 'react';
const Login = () => {

  const login = () => {
    let baseUrl = `${window.location.protocol}//${window.location.hostname}`;
    if (window.location.port !== '443') {
      baseUrl = `${baseUrl}:${window.location.port}`;
    }
    window.location.replace(`https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${encodeURIComponent(`${baseUrl}/login-redirect`)}&prompt=consent&response_type=code&client_id=710411787393-6oke2o3ae0j2ekq51hqkkdofteneufrl.apps.googleusercontent.com&scope=https://mail.google.com/&access_type=offline`)
  }
  return <div>
    <h2>Login Page</h2>
    <button onClick={login}>Login</button>
    <br/>
  </div>
};

export default Login;
