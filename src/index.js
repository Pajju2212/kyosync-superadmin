import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// FIX: Import i18n configuration here
import './i18n'; 

import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { ModalProvider } from './context/ModalProvider';
import { TabProvider } from './context/TabProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastContainer />
    <BrowserRouter>
      <AuthProvider>
        <TabProvider>
          <ModalProvider>
            <Routes>
              <Route path='/*' element={<App />} />
            </Routes>
          </ModalProvider>
        </TabProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();