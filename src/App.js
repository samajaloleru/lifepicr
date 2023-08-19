import React from 'react'
import { Routes, Route } from 'react-router-dom';

import { gapi } from "gapi-script";

import { config } from './utils/config';
import Login from './components/Login';
import Home from './container/Home';

const App = () => {
  gapi.load("client:auth2", () => {
    gapi.client.init({
      clientId: config.google.token,
      plugin_name: "chat",
    });
  });
  return (
    <Routes>
        <Route path="login" element={<Login/>} />
        <Route path="/*" element={<Home/>} />
    </Routes>
  )
}

export default App