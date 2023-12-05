import './App.css';
import LandingPage from './pages/LandingPage';
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import OptionsPage from './pages/OptionsPage';

function App() {
  return (
    <>
    <React.Suspense fallback={<div>Loading...</div>}>
    <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="options" element={<OptionsPage />} />
      </Routes>
      </React.Suspense>
    </>
    
  );
}

export default App;
