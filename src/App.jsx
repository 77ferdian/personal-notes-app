import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import AddNotePage from './pages/AddNotePage';
import EditNotePage from './pages/EditNotePage';
import ArchivedPage from './pages/ArchivedPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const navigate = useNavigate();

  function handleAddNote() {
    navigate('/notes/new');
  }

  return (
    <div className="app-container">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage onAddNote={handleAddNote} />} />
        <Route path="/archived" element={<ArchivedPage />} />
        <Route path="/notes/new" element={<AddNotePage />} />
        <Route path="/notes/:id/edit" element={<EditNotePage />} />
        <Route path="/notes/:id" element={<DetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
