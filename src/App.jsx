import { Router, Routes, Route } from "react-router-dom";
import Groups from "./pages/Groups"
import Expenses from "./pages/Expenses";
import Balances from "./pages/Balances";
import Signup from "./components/Auth/signUp";
import Login from "./components/Auth/login";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useTheme } from './context/ThemeContext';



function App() {
    const { theme, toggleTheme } = useTheme();


  return (
    <>

      <Router>

        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Groups /></ProtectedRoute>} />
          <Route path="/expenses/:groupId" element={<ProtectedRoute><Expenses /></ProtectedRoute>} />
          <Route path="/balances/:groupId" element={<ProtectedRoute><Balances /></ProtectedRoute>} />
        </Routes>
      </Router>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className='theme-toggle-btn m-0 p-0'>
        <a href="#" className='goToTop'></a>
        <button onClick={toggleTheme} className="btn btn-secondary btn-sm">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </>
  );
}

export default App;
