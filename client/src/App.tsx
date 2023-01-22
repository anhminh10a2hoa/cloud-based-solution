import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import MainView from './view/MainView';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<MainView />} />
      <Route path='/:projectId' element={<MainView />} />
      <Route path='/assets/:assetId' element={<MainView />} />
    </Routes>
  )
}