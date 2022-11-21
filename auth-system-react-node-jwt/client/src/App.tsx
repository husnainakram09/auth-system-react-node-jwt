import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Home from './components/Home';
import Login from './components/LoginForm';
import Protected from './components/Protexted';
import StickyFooter from './components/Footer';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Protected Component={<Home/>} />}/>
        <Route path="/login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
