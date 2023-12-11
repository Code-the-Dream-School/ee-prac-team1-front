import {
    AppBar,
    Avatar,
    Box,
    Button,
    IconButton,
    Stack,
    Toolbar,
    Typography,
} from "@mui/material";
import { React, useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import Logo from "../assets/logo90.png";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import { theme } from "../utils/theme";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/userContext";

const Navbar = () => {
    const navigate = useNavigate();
    const { userData, setUserData } = useContext(userDataContext);
    const { isLoggedIn, user } = userData;
    
    const getInitials = () => {

    const { firstName, lastName } = user || { firstName: "", lastName: "" };    
    const initials =
        firstName && lastName
            ? `${firstName.charAt(0)}${lastName.charAt(0)}`
            : "";
    return initials;
    };
    
    const [initials, setInitials] = useState(getInitials());

    useEffect(() => {
        const loggedInUser = localStorage.getItem("jwtToken");
        if (loggedInUser) {
            setUserData({ isLoggedIn: true, token: loggedInUser });
            fetchUserData(loggedInUser);
        }
        setInitials(getInitials());
    }, [setUserData]);

    const fetchUserData = async (token) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const res = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/api/v1/users/current-user`,
                config
            );

            if (res.data && res.data.user) {
                const user = res.data.user;
                setUserData((prevUserData) => ({
                    ...prevUserData,
                    user: user,
                }));

                setInitials(getInitials(user));
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const handleCreateActivity = () => {
        if (!isLoggedIn) {
            toast.warning("Please register or login to create activity", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        }
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

    return (
        <>
            <AppBar
                position="static"
                sx={{
                    backgroundImage: theme.palette.background.gradient,
                    // bgcolor: theme.palette.background.main,
                    boxShadow: "none",
                }}
            >
                <Toolbar
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <Box
                        sx={{
                            marginTop: "10px",
                        }}
                    >
                        <img src={Logo} alt="Player Buddy Logo" />
                    </Box>
                    <Stack
                        direction="row"
                        sx={{
                            color: theme.palette.primary.contastText,
                            justifyContent: "flex-end",
                        }}
                    >
                        {/* Menu Buttons: Create activity */}
                        {/* </Button> */}
                        <Button
                            sx={{
                                ...theme.navbarButtonStyles,
                            }}
                            variant="text"
                            onClick={handleCreateActivity}
                            // disabled={!isLoggedIn}
                        >
                            Create Activity
                        </Button>
                        {/* User Profile/log In/Sign Up Icon*/}
                        <IconButton
                            aria-label="login"
                            component={Link}
                            to={isLoggedIn ? "/profileform" : "/login"}
                            sx={{
                                color: "#090759",
                            }}
                        >
                            {/* Welcome message */}
                            {isLoggedIn && (
                                <Typography
                                    sx={{
                                        paddingRight: "2px",
                                        ...theme.typography.subTitleText2,
                                    }}
                                >
                                    Hello,
                                </Typography>
                            )}
                            {isLoggedIn ? (
                                <Avatar
                                    sx={{
                                        bgcolor: "#090759",
                                        width: 30,
                                        height: 30,
                                        fontSize: 11,
                                    }}
                                >
                                    {initials}
                                </Avatar>
                            ) : (
                                <AccountCircleIcon />
                            )}
                        </IconButton>
                        {/* Home Icon */}
                        <IconButton
                            aria-label="home"
                            component={Link}
                            to="/"
                            sx={{
                                color: "#090759",
                            }}
                        >
                            <HomeIcon />
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
