import React from 'react';
import ReactDOM from 'react-dom/client';
import './output.css';
import App from './App.tsx';
import reportWebVitals from './reportWebVitals.js';
import {GoogleOAuthProvider} from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="710411787393-6oke2o3ae0j2ekq51hqkkdofteneufrl.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
