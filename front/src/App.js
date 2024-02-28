import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Error from './pages/Error/Error';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
    const loggedIn = useSelector((state) => state.auth.loggedIn);

    return (
        <div className="App">
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/profile"
                        element={loggedIn ? <Dashboard /> : <Navigate to="/login" />}
                    />
                    <Route path="*" element={<Error />} />
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
