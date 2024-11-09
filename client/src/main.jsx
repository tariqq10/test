import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // This is fine, no change.
import App from './App.jsx';  // Corrected the path to reflect `Admin` folder structure.

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
