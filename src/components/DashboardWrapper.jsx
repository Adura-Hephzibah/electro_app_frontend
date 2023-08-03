import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { CssBaseline } from '@mui/material';


function DashboardWrapper({ children = 'Dashboard Children' }) {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <div>
            <CssBaseline />
            <Navbar handleDrawerToggle={handleDrawerToggle} />
            <Sidebar
                mobileOpen={mobileOpen}
                handleDrawerToggle={handleDrawerToggle}
                children={children}
            />
        </div>
    )
}

export default DashboardWrapper