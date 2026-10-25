import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext';
import { LocaleProvider } from './contexts/LocaleContext';
import { ConfirmProvider } from './contexts/ConfirmContext';
import { ToastProvider } from './contexts/ToastContext';

import './styles/style.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ThemeProvider>
      <LocaleProvider>
        <ConfirmProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </ConfirmProvider>
      </LocaleProvider>
    </ThemeProvider>
  </BrowserRouter>
);
