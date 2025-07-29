import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Groups from "./pages/Groups"
import Expenses from "./pages/Expenses";
import Balances from "./pages/Balances";
import Signup from "./components/Auth/signUp";
import Login from "./components/Auth/login";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";



function App() {

  // useEffect(() => {
  //   const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  //   const tooltipList = [...tooltipTriggerList].map(
  //     (tooltipTriggerEl) => new window.bootstrap.Tooltip(tooltipTriggerEl)
  //   );

  //   return () => {
  //     tooltipList.forEach(tooltip => tooltip.dispose());
  //   };
  // }, []);

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Groups /></ProtectedRoute>} />
        <Route path="/expenses/:groupId" element={<ProtectedRoute><Expenses /></ProtectedRoute>} />
        <Route path="/balances/:groupId" element={<ProtectedRoute><Balances /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
