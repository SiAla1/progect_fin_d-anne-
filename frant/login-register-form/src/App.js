import React, { useState } from "react";
import './App.css';
import { Route, Routes } from 'react-router-dom';
import InterfaceAdmin from "./interfaces/admin/admin_interface";
import User from "./interfaces/user/user_interface";
import AdminHome from "./interfaces/admin/adminHome";
import { Login } from "./interfaces/user/Login"
import { Register } from "./interfaces/user/Register";
import Home from './interfaces/user/pageHome';
import AllNV from "./interfaces/admin/allUserNV";
import ReadNV from "./interfaces/admin/readNV"

function App() {

  return (
    <div className="App">

      <Routes>

        <Route path='/' element={<User />} >
          <Route index element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/home' element={<Home />} />
        </Route>

        <Route path='/adminInterface' element={<InterfaceAdmin />} >
          <Route index element={<AdminHome />} />
          <Route path='/adminInterface/allUserNV' element={<AllNV />} />
          <Route path='/adminInterface/allUserNV/:id' element={< ReadNV />} />
        </Route>

      </Routes>

    </div>
  );
}

export default App;
