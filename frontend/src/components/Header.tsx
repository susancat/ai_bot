import React from 'react';
import { AppBar, Toolbar} from '@mui/material'
import Logo from './shared/Logo'
import NavLink from './shared/NavLink'
import { useAuth } from '../context/AuthContext'
const Header = () => {
    const auth = useAuth();
    return (
        <AppBar sx={{ bgcolor: "transparent", position: "static", boxShadow: "none"}}>
            <Toolbar sx={{ display: "flex" }}>
            <Logo />
            <div>
                {auth?.isLoggedIn ? 
                (<>
                <NavLink to="/chat" bg="#00fffc" text="Go to chat" textColor="black" />
                <NavLink to="/" bg="#51538f" text="Logout" textColor="white" onClick={auth.logout}/>
                </>
                ) : (
                <>
                <NavLink to="/login" bg="#00fffc" text="Login" textColor="black" />
                <NavLink to="/signup" bg="#51538f" text="Sign Up" textColor="white" />
                </>
                )
                }
            </div>
            </Toolbar>
        </AppBar>
    );
}

export default Header;