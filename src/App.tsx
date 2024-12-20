import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./Login.js";
import Home from "./Home.js";
import LoginRedirect from "./LoginRedirect.js";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/login-redirect" element={<LoginRedirect />}/>
        <Route path="/home" element={<Home />}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;