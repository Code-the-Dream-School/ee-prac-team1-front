import {
    AppBar,
    Avatar,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";

import React from "react";
import { theme } from "../utils/theme";

const Footer = () => {
    const githubProfiles = [
        {
            name: "Oxana Michkasova",
            username: "oxangyal",
            avatarUrl: "https://avatars.githubusercontent.com/u/103294778?v=4",
        },
        {
            name: "Fany Kreminski",
            username: "Kremifany",
            avatarUrl: "https://avatars.githubusercontent.com/u/34751960?v=4",
        },
        {
            name: "Vitalii Popovych",
            username: "vitaliipp",
            avatarUrl: "https://avatars.githubusercontent.com/u/109319234?v=4",
        },
        {
            name: "Ljiljana Janjic",
            username: "Ljanjic",
            avatarUrl: "https://avatars.githubusercontent.com/u/118481016?v=4",
        },
        {
            name: "Tammam Alwafai",
            username: "TammamWafai",
            avatarUrl: "https://avatars.githubusercontent.com/u/47179662?v=4",
        },
    ];
    return (
        <AppBar
            position="static"
            sx={{
                backgroundImage: theme.palette.background.gradient,
                boxShadow: "none",
                marginTop: "auto",
            }}
        >
                <Stack
                    direction="row"
                    sx={{  justifyContent: "center" }}
                >
                    {/* Icons of GitHub repositories of creators */}
                    <Typography
                        sx={{
                            ...theme.typography,
                            fontWeight: "700",
                        }}
                    >
                        Crafted by
                        {githubProfiles.map((profile) => (
                            <IconButton
                                sx={{ ml: 1 }}
                                color="inherit"
                                href={`https://github.com/${profile.username}`}
                            >
                                <Avatar
                                    alt={profile.name}
                                    src={profile.avatarUrl}
                                />
                            </IconButton>
                        ))}
                    </Typography>
                    {/* Home Icon */}
                    {/* <IconButton
                        aria-label="home"
                        component={Link}
                        to="/"
                        sx={{
                            color: "#090759",
                        }}
                    >
                        <HomeIcon /> */}
                    {/* </IconButton> */}
                </Stack>
        </AppBar>
    );
};

export default Footer;
