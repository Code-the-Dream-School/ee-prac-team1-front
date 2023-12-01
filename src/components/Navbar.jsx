import {
    AppBar,
    Button,
    IconButton,
    Stack,
    Toolbar,
    Avatar,
} from "@mui/material";
import { React, useContext } from "react";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import Logo from "../assets/logo70.png";
import LogoutIcon from "@mui/icons-material/Logout";
import { theme } from "../utils/theme";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/userContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Navbar = () => {
    const navigate = useNavigate();
    const { userData, setUserData } = useContext(userDataContext);
    const { isLoggedIn, user } = userData;
    const { firstName, lastName } = user || { firstName: "", lastName: "" };

    const handleCreateActivity = () => {
        navigate("/createactivity");
    };

    const handleLogout = async () => {
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/api/v1/auth/logout`
            );
            if (res.status === 200) {
                localStorage.removeItem("jwtToken");
                localStorage.removeItem("userId");
                setUserData({ isLoggedIn: false });
                toast.success("Logout successful");
                navigate("/");
            } else {
                console.error("Logout failed:", res.data);
                console.log(res.data);
                toast.error("Logout failed. Please try again.");
            }
        } catch (error) {
            console.error("Logout error:", error.message);
            toast.error("Logout failed. Please try again", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    const getInitials = () => {
        const firstInitial = firstName ? firstName.charAt(0) : "";
        const lastInitial = lastName ? lastName.charAt(0) : "";
        return `${firstInitial}${lastInitial}`;
    };

    return (
        <>
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
                        {/* Menu Buttons:  My activities and Create activity */}
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
                            {isLoggedIn ? (
                                <Avatar
                                    // alt="User Profile Image"
                                    sx={{
                                        bgcolor: "#090759",
                                        width: 30,
                                        height: 30,
                                        textDecoration: "none",
                                    }}
                                    component={Link}
                                    to="/profileform"
                                >
                                    {getInitials()}
                                </Avatar>
                            ) : (
                                <AccountCircleIcon />
                            )}
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
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
};

export default Navbar;
