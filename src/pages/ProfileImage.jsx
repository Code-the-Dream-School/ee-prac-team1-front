import React from "react";
// import {useState, useEffect } from "react";
import { Avatar, Badge } from "@mui/material/";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
// import axios from "axios";

const ProfileImage = () => {
    // const [userData, setUserData] = useState({
    //     firstName: "",
    //     lastName: "",
    // });

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get("api/v1/user");
    //             setUserData(res.data);
    //         } catch (error) {
    //             console.error("Error fetching user data:", error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    // const getInitials = () => {
    //     const { firstName, lastName } = userData;
    //     const firstInitial = firstName ? firstName.charAt(0) : "";
    //     const lastInitial = lastName ? lastName.charAt(0) : "";
    //     return firstInitial + lastInitial;
    // };

    return (
        <Badge
            sx={{
                paddingLeft: 8,
                marginBottom: 2,
            }}
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
                <AddAPhotoIcon
                    sx={{
                        color: "#090759",
                        marginLeft: 4,
                        cursor: "pointer",
                    }}
                />
            }
        >
            <Avatar
                // alt="User Profile Image"
                sx={{
                    bgcolor: "#1DE619",
                    width: 100,
                    height: 100,
                }}
            >
                {/* {getInitials()} */}
            </Avatar>
        </Badge>
    );
};

export default ProfileImage;
