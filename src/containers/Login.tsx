import React from 'react';
const Login = () => {

  const login = () => {
    let baseUrl = `${window.location.protocol}//${window.location.hostname}`;
    if (window.location.port.length > 0) {
      baseUrl = `${baseUrl}:${window.location.port}`;
    }
    window.location.replace(`https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${encodeURIComponent(`${baseUrl}/login-redirect`)}&prompt=consent&response_type=code&client_id=710411787393-6oke2o3ae0j2ekq51hqkkdofteneufrl.apps.googleusercontent.com&scope=https://mail.google.com/&access_type=offline`)
  }
  return <div>
    <h2>Login Page</h2>
    <button
        className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg hover:border-slate-400 dark:hover:border-slate-500 hover:shadow transition duration-150 text-black"
        onClick={login}
    >
      <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy"
           alt="google logo"/>
      <span>Login with Google</span>
    </button>
    <br/>
  </div>
};

export default Login;
