import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Login from '../screens/Login'
import Register from '../screens/Register'
import Home from '../screens/Home'
import Project from '../screens/Project'
import UserAuth from '../auth/UserAuth'
import ProjectsGrid from '../screens/ProjectsGrid'
import Navbar from '../components/layout/NavBar'

const AppRoutes = () => {
    return (
        <BrowserRouter>
<Navbar/>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/all" element={<UserAuth><ProjectsGrid /></UserAuth>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/project" element={<UserAuth><Project /></UserAuth>} />
            </Routes>

        </BrowserRouter>
    )
}

export default AppRoutes