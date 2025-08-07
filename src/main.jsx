import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // For modal functionality
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-toastify/dist/ReactToastify.css';
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/ReactSplitPaymentApp">
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
