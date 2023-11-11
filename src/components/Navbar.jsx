import { AppBar, Button, IconButton, Stack, Toolbar } from "@mui/material";
import { React, useState } from "react";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import Logo from "../assets/logo70.png";
import LogoutIcon from "@mui/icons-material/Logout";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <AppBar
            position="static"
            sx={{
                bgcolor: "#caf2c9",
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
                        color: "#090759",
                        justifyContent: "flex-end",
                    }}
                >
                    {/* Menu Buttons:  My games and Create a game */}
                    <Button
                        sx={{
                            fontSize: 14,
                            fontWeight: "bold",
                            fontFamily: "Poppins",
                            color: "#090759",
                            cursor: "pointer",
                        }}
                        variant="text"
                    >
                        My Games
                    </Button>
                    <Button
                        sx={{
                            fontSize: 14,
                            fontWeight: "bold",
                            fontFamily: "Poppins",
                            color: "#090759",
                            cursor: "pointer",
                        }}
                        variant="text"
                    >
                        Create a Game
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