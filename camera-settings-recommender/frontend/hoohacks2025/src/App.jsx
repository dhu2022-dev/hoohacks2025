import { useState } from 'react'
import Home from './pages/Home';
import Upload from './pages/Upload';
import Result from './pages/Result';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/result/:filename" element={<Result />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App
