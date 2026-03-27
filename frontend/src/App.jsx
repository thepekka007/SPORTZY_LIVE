import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CheckoutPage from './pages/CheckoutPage';
import Login from "./pages/login";
import Signup from "./pages/Signup";
import PrivateRouter from './components/PrivateRouter';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </Router>
    );
}
export default App;