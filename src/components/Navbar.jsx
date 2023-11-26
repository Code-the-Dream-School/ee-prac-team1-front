import { AppBar, Button, IconButton, Stack, Toolbar } from "@mui/material";
import { React, useState } from "react";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import Logo from "../assets/logo70.png";
import LogoutIcon from "@mui/icons-material/Logout";
import { theme } from "../utils/theme";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    const handleCreateActivity = () => {
        navigate("/createactivity");
    };

    return (
        <AppBar
            position="static"
            sx={{
                bgcolor: theme.palette.background.main,
                boxShadow: "none",
            }}
        >
            <Toolbar
                sx={{
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                <img src={Logo} alt="Player Buddy Logo" />
                <Stack
                    direction="row"
                    sx={{
                        color: theme.palette.primary.contastText,
                        justifyContent: "flex-end",
                    }}
                >
                    {/* Menu Buttons:  My games and Create a game */}
                    <Button
                        sx={{
                            ...theme.navbarButtonStyles,
                        }}
                        variant="text"
                    >
                        My Activities
                    </Button>
                    <Button
                        sx={{
                            ...theme.navbarButtonStyles,
                        }}
                        variant="text"
                        onClick={handleCreateActivity}
                    >
                        Create Activity
                    </Button>

                    {/* User Profile/log In/Sign Up Icon*/}
                    <IconButton
                        aria-label="login"
                        component={Link}
                        to="/login"
                        sx={{
                            color: "#090759",
                        }}
                    >
                        <AccountCircleIcon />
                    </IconButton>

                    {/* Logout Icon */}
                    <IconButton
                        aria-label="logout"
                        sx={{ color: "#090759" }}
                        onClick={handleLogout}
                    >
                        {isLoggedIn ? <LogoutIcon /> : null}
                    </IconButton>
                </Stack>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;