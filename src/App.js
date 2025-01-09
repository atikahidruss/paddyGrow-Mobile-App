import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Notifications from './components/Notifications';
import Plants from './components/Plants';
import Login from './components/Login';
import Signup from "./components/Signup";
import LogoutButton from "./components/LogoutButton"; 
import AddPlant from './components/AddPlant';

function App() {
  return (
    <Router>
      <LogoutButton /> 
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} /> 
      <Route path="/home" element={<Home />} />
        <Route path="/dashboard/:id" element={<Dashboard />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/plants" element={<Plants />} />
        <Route path="/add-plant" element={<AddPlant />} />
      </Routes>
    </Router>
  );
}

export default App;
