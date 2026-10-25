import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import LoadingScreen from './components/LoadingScreen';
import HomePage from './pages/HomePage';
import ArchivedPage from './pages/ArchivedPage';
import AddNotePage from './pages/AddNotePage';
import EditNotePage from './pages/EditNotePage';
import DetailPage from './pages/DetailPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { getUserLogged, putAccessToken } from './utils/network-data';
import LocaleContext from './contexts/LocaleContext';

function App() {
  const { content } = useContext(LocaleContext);
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const { error, data } = await getUserLogged();
      if (!error && data) {
        setAuthedUser(data);
      } else {
        setAuthedUser(null);
      }
      setInitializing(false);
    }

    checkAuth();
  }, []);

  async function onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  }

  function onLogout() {
    setAuthedUser(null);
    putAccessToken('');
  }

  if (initializing) {
    return <LoadingScreen text={content.loadingApp} />;
  }

  return (
    <div className="app-container">
      <Header authedUser={authedUser} onLogout={onLogout} />
      <div className="app-body">
        {authedUser === null ? (
          <Routes>
            <Route
              path="/login"
              element={<LoginPage loginSuccess={onLoginSuccess} />}
            />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/archived" element={<ArchivedPage />} />
            <Route path="/notes/new" element={<AddNotePage />} />
            <Route path="/notes/:id/edit" element={<EditNotePage />} />
            <Route path="/notes/:id" element={<DetailPage />} />
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/register" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        )}
      </div>
    </div>
  );
}

export default App;
