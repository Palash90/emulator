import React from 'react';
import ReactDOM from 'react-dom/client';
import MinimalHardwareEmulator from './components/App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MinimalHardwareEmulator />
  </React.StrictMode>
);


