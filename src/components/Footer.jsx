import React from "react";
import { Link } from "react-router-dom";
import { theme } from "../utils/theme";
import {
    AppBar,
    IconButton,
    Stack,
    Toolbar,
    Typography,
    Tooltip,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
    return (
        <AppBar
            position="static"
            sx={{
                backgroundImage: theme.palette.background.gradient,
                boxShadow: "none",
                marginTop: "auto",
            }}
        >
            <Toolbar
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                }}
            >
                <Stack
                    direction="row"
                    sx={{
                        justifyContent: "center",
                    }}
                >
                    {/* Icons of GitHub repositories of creators */}
                    <Typography
                        sx={{
                            ...theme.typography,
                            fontWeight: "700"
                        }}
                    >
                        Created by
                    </Typography>
                    <Tooltip title="Oxana Michkasova" arrow>
                        <IconButton
                            sx={{ bgcolor: "#090759", ml: 1 }}
                            color="inherit"
                            href="https://github.com/oxangyal"
                        >
                            <GitHubIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Fany Kreminsky" arrow>
                        <IconButton
                            sx={{ bgcolor: "#090759", ml: 1 }}
                            color="inherit"
                            href="https://github.com/Kremifany"
                        >
                            <GitHubIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Vitalii Popovich" arrow>
                        <IconButton
                            sx={{ bgcolor: "#090759", ml: 1 }}
                            color="inherit"
                            href="https://github.com/vitaliipp"
                        >
                            <GitHubIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Ljiljana Janjic " arrow>
                        <IconButton
                            sx={{ bgcolor: "#090759", ml: 1 }}
                            color="inherit"
                            href="https://github.com/Ljanjic"
                        >
                            <GitHubIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Tammam Alwafai" arrow>
                        <IconButton
                            sx={{ bgcolor: "#090759", ml: 1 }}
                            color="inherit"
                            href="https://github.com/TammamWafai"
                        >
                            <GitHubIcon />
                        </IconButton>
                    </Tooltip>
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
                </Stack>
            </Toolbar>
        </AppBar>
    );
};

export default Footer;
