import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./containers/Login";
import Home from "./containers/Home";
import Settings from "./containers/Settings";
import LoginRedirect from "./containers/LoginRedirect";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/login-redirect" element={<LoginRedirect />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/settings" element={<Settings />}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;