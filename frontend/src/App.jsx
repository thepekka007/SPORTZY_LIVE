//import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/NavBar.jsx';
import CheckoutPage from './pages/CheckoutPage';
import Login from "./pages/login.jsx";
import Signup from "./pages/Signup.jsx";
import ClubReg from './pages/ClubReg.jsx';
import PrivateRouter from './components/PrivateRouter.jsx';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/clubregister" element={<ClubReg />} />
            </Routes>
        </Router>
    );
}
export default App;