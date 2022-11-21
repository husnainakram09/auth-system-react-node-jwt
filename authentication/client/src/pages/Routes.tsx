import * as React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthenticatedContext } from '../Context/AuthenticatedContext';
import Dashboard from './dashboard/Dashboard';
import Login from "./Login/Login"
import NoPage from "./NoPage"
import PrivateRoute from './important/PrivateRoute';
import LandingPage from './frontend/LandingPage';

// import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { Navbar } from '../components';

function CustomRoutes() {
    const { isAuthenticated } = React.useContext<any>(AuthenticatedContext);
    return (
        <div style={{ height: '100vh' }}>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path='/' element={< LandingPage />} />
                    <Route path='/login' element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
                    {/* <Route path='/login' element={ <Login /> } /> */}
                    <Route path='/dashboard' element={<PrivateRoute Component={Dashboard} />} />
                    {/* <Route path='/dashboard' element={ <Dashboard/>} /> */}
                    <Route path='*' element={<NoPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default CustomRoutes;