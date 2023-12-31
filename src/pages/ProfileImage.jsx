import { Avatar, Badge, Box, TextField } from "@mui/material/";
import { useEffect, useState } from "react";

import AddBoxIcon from "@mui/icons-material/AddBox";
import React from "react";
import axios from "axios";
import { theme } from "../utils/theme";

const ProfileImage = (event) => {
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        profileImage: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("jwtToken");
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
                setUserData(res.data.user);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchData();
    }, []);

    const getInitials = () => {
        const { firstName, lastName } = userData;
        const firstInitial = firstName ? firstName.charAt(0) : "";
        const lastInitial = lastName ? lastName.charAt(0) : "";
        return firstInitial + lastInitial;
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("profileImage", file);

        try {
            const token = localStorage.getItem("jwtToken");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            };

            const res = await axios.patch(
                `${process.env.REACT_APP_BASE_URL}/api/v1/users/updateUser`,
                formData,
                config
            );

            setUserData((prevUserData) => ({
                ...prevUserData,
                profileImage: res.data.profileImage,
            }));
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    return (
        <>
            <Box display="flex" flexDirection="row" alignItems="center">
                <Badge
                    sx={{
                        // paddingLeft: 8,
                        marginBottom: 2,
                    }}
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    badgeContent={
                        <AddBoxIcon
                            sx={{
                                color: "#090759",
                                marginLeft: 1,
                                marginTop: 2,
                                cursor: "pointer",
                            }}
                            onClick={() =>
                                document.getElementById("fileInput").click()
                            }
                            // onClick={handleImageUpload}
                        />
                    }
                >
                    <Avatar
                        src={userData.profileImage}
                        alt="User Profile Image"
                        sx={{
                            bgcolor: "#1DE619",
                            width: 100,
                            height: 100,
                        }}
                    >
                        {userData.profileImage ? null : getInitials()}
                        {/* {getInitials()} */}
                        {/* {userData.profileImage} */}
                    </Avatar>
                </Badge>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                    marginLeft={2}
                >
                    <TextField
                        label="First Name"
                        variant="outlined"
                        size="small"
                        value={userData.firstName}
                        sx={{
                            marginBottom: 1,
                            width: 180,
                            font: 14,
                            "& .MuiInputLabel-root.Mui-focused":
                                theme.overrides.MuiInputLabel.root[
                                    "&.Mui-focused"
                                ],
                            "& .MuiOutlinedInput-root":
                                theme.overrides.MuiOutlinedInput.root,
                        }}
                    />
                    <TextField
                        label="Last Name"
                        variant="outlined"
                        size="small"
                        value={userData.lastName}
                        sx={{
                            marginBottom: 1,
                            width: 180,
                            font: 14,
                            "& .MuiInputLabel-root.Mui-focused":
                                theme.overrides.MuiInputLabel.root[
                                    "&.Mui-focused"
                                ],
                            "& .MuiOutlinedInput-root":
                                theme.overrides.MuiOutlinedInput.root,
                        }}
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        size="small"
                        value={userData.email}
                        sx={{
                            width: 180,
                            marginBottom: 2,
                            "& .MuiInputLabel-root.Mui-focused":
                                theme.overrides.MuiInputLabel.root[
                                    "&.Mui-focused"
                                ],
                            "& .MuiOutlinedInput-root":
                                theme.overrides.MuiOutlinedInput.root,
                        }}
                    />
                </Box>
                <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageUpload}
                />
            </Box>
        </>
    );
};

export default ProfileImage;
