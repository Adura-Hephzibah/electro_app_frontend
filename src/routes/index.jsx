import React from "react";
import Dashboard from "../pages/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "../pages/Login";
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import "./../App.css";
import { SnackbarProvider } from 'notistack';
import PrivateRoute from "./PrivateRoute";
import Distribute from "../pages/Distribute";
import Settings from "../pages/Settings";
import Users from "../pages/Users";
import Requests from "../pages/Requests";
import Regions from "../pages/Regions";
import View from "../pages/View";
import Disable from "../pages/Disable";
import Allocate from "../pages/Allocate";
import EnableUser from "../pages/EnableUser";
import CreateRegion from "../pages/CreateRegion";


// Define custom breakpoints 
const customBreakpoints = {
    xs: 320, // Extra small screens (up to 320px)
    sm: 600, // Small screens (from 600px and up)
    md: 770, // Medium screens (from 960px and up)
    lg: 1030, // Large screens (from 1280px and up)
    xl: 1920, // Extra large screens (from 1920px and up)
};

// Create a custom theme with the defined breakpoints
const theme = createTheme({
    breakpoints: {
        values: customBreakpoints,
    },
});

const AllRoutes = () => {

    return (
        <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <ThemeProvider theme={theme}>
                <Router>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/dashboard" element={<PrivateRoute permission={"dashboard"}><Dashboard /></PrivateRoute>} />
                        <Route path="/dashboard/distribute" element={<PrivateRoute permission={"distribute"}><Distribute /></PrivateRoute>} />
                        <Route path="/dashboard/settings" element={<PrivateRoute permission={"settings"}><Settings /></PrivateRoute>} />
                        <Route path="/dashboard/regions" element={<PrivateRoute permission={"regions"}><Regions /></PrivateRoute>} />
                        <Route path="/dashboard/regions/create" element={<PrivateRoute permission={"regions"}><CreateRegion /></PrivateRoute>} />
                        <Route path="/dashboard/users" element={<PrivateRoute permission={"users"}><Users /></PrivateRoute>} />
                        <Route path="/dashboard/requests" element={<PrivateRoute permission={"requests"}><Requests /></PrivateRoute>} />
                        <Route path="/dashboard/users/view" element={<PrivateRoute permission={"users"}><View /></PrivateRoute>} />
                        <Route path="/dashboard/users/disable" element={<PrivateRoute permission={"users"}><Disable /></PrivateRoute>} />
                        <Route path="/dashboard/users/enable" element={<PrivateRoute permission={"users"}><EnableUser /></PrivateRoute>} />
                        <Route path="/dashboard/users/allocate-user-to-region" element={<PrivateRoute permission={"users"}><Allocate /></PrivateRoute>} />
                    </Routes>
                </Router>
            </ThemeProvider>
        </SnackbarProvider>
    )
}

export default AllRoutes;
