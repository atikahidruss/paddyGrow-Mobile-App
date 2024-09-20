import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Notifications from './components/Notifications';
import Plants from './components/Plants';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add the dynamic :id parameter to the dashboard route */}
        <Route path="/dashboard/:id" element={<Dashboard />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/plants" element={<Plants />} />
      </Routes>
    </Router>
  );
}

export default App;
