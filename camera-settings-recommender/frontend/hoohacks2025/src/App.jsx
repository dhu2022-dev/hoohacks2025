import { useState } from 'react'
import Home from './pages/Home';
import Upload from './pages/Upload';
import Result from './pages/Result';
import AIPromptPage from './pages/AIPromptPage';
import AIResultsPage from './pages/AIResultsPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/result/:filename" element={<Result />} />
          <Route path="/prompt" element={<AIPromptPage />} />
          <Route path="/ai-results" element={<AIResultsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
