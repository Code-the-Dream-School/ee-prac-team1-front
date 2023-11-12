import {
    Box,
    Button,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    ThemeProvider,
} from "@mui/material";

import Logo from "../assets/logo70.png";
import { theme } from "../utils/theme";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ProfileForm = () => {
    const [userData, setUserData] = useState({
        phoneNumber: "",
        dateOfBirth: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        experienceLevel: "Beginner",
    });
    const navigate = useNavigate();
    
    const handleInputChange = (e) => {
        setUserData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSave = (e) => {
        // e.preventDefault();
        // const endpoint = "/api/v1/profiledata";
        // axios.post(endpoint, userData)
        //     .then((response) => {
        //         console.log("Saved successfully:", response.data);
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     });
    };

    const handleCancel = () => {
            navigate("/");
    };

    const commonButtonStyles = {
        marginTop: 15,
        fontSize: 14,
        fontWeight: "800",
        fontFamily: "Poppins",
        color: "#090759",
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <Box sx={{ bgcolor: "#DFF8D6" }}>
                    <form onSubmit={handleSave}>
                        <Box
                            display="flex"
                            flexDirection={"column"}
                            maxWidth={500}
                            alignItems={"start"}
                            justifyContent={"center"}
                            margin={"auto"}
                            gap={1}
                            padding={3}
                        >
                            <img src={Logo} alt="Player Buddy Logo" />

                            <TextField
                                marginTop={3}
                                size="small"
                                sx={{
                                    bgcolor: "#fff",
                                    // width: "200",

                                    "& label": {
                                        "&.Mui-focused": {
                                            color: "#090759",
                                        },
                                    },

                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                            borderColor: "#DFF8D6",
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "#00367D",
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#00367D",
                                        },
                                    },
                                }}
                                label="Phone Number"
                                name="phoneNumber"
                                id="outlined"
                                variant="outlined"
                                value={userData.phoneNumber}
                                InputProps={{
                                    placeholder: "Phone Number",
                                }}
                                onChange={handleInputChange}
                            />
                            <InputLabel
                                sx={{
                                    fontSize: 14,
                                    fontFamily: "Poppins",
                                    color: "#090759",
                                    paddingLeft: 2,
                                }}
                            >
                                Date of Birth
                            </InputLabel>
                            <TextField
                                sx={{
                                    bgcolor: "#fff",
                                    "& label": {
                                        "&.Mui-focused": {
                                            color: "#090759",
                                        },
                                    },

                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                            borderColor: "#DFF8D6",
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "#00367D",
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#00367D",
                                        },
                                    },
                                }}
                                size="small"
                                type="date"
                                name="dateOfBirth"
                                value={userData.dateOfBirth}
                                onChange={handleInputChange}
                            />
                            <TextField
                                sx={{
                                    bgcolor: "#fff",

                                    "& label": {
                                        "&.Mui-focused": {
                                            color: "#090759",
                                        },
                                    },

                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                            borderColor: "#DFF8D6",
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "#00367D",
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#00367D",
                                        },
                                    },
                                }}
                                label="Address"
                                name="address"
                                value={userData.address}
                                onChange={handleInputChange}
                                InputProps={{
                                    placeholder: "Address",
                                }}
                            />
                            <TextField
                                sx={{
                                    bgcolor: "#fff",

                                    "& label": {
                                        "&.Mui-focused": {
                                            color: "#090759",
                                        },
                                    },

                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                            borderColor: "#DFF8D6",
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "#00367D",
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#00367D",
                                        },
                                    },
                                }}
                                size="small"
                                label="City"
                                name="city"
                                value={userData.city}
                                onChange={handleInputChange}
                                InputProps={{
                                    placeholder: "City",
                                }}
                            />
                            <TextField
                                sx={{
                                    bgcolor: "#fff",

                                    "& label": {
                                        "&.Mui-focused": {
                                            color: "#090759",
                                        },
                                    },

                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                            borderColor: "#DFF8D6",
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "#00367D",
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#00367D",
                                        },
                                    },
                                }}
                                size="small"
                                label="State"
                                name="state"
                                value={userData.state}
                                onChange={handleInputChange}
                                InputProps={{
                                    placeholder: "State",
                                }}
                            />
                            <TextField
                                sx={{
                                    bgcolor: "#fff",
                                    "& label": {
                                        "&.Mui-focused": {
                                            color: "#090759",
                                        },
                                    },

                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                            borderColor: "#DFF8D6",
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "#00367D",
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#00367D",
                                        },
                                    },
                                }}
                                size="small"
                                label="Zip Code"
                                name="zipCode"
                                id="outlined"
                                variant="outlined"
                                value={userData.zipCode}
                                InputProps={{
                                    placeholder: "Zip Code",
                                }}
                                onChange={handleInputChange}
                            />
                            <InputLabel
                                sx={{
                                    fontSize: 14,
                                    fontFamily: "Poppins",
                                    color: "#090759",
                                    marginLeft: 1,
                                }}
                            >
                                Experience
                            </InputLabel>

                            <Select
                                sx={{
                                    bgcolor: "#fff",
                                }}
                                size="small"
                                name="experienceLevel"
                                value={userData.experienceLevel}
                                onChange={handleInputChange}
                                aria-label="Experience Level"
                            >
                                <MenuItem sx={{}} value="Beginner">
                                    {" "}
                                    Beginner
                                </MenuItem>
                                <MenuItem value="Intermediate">
                                    Intermediate
                                </MenuItem>
                                <MenuItem value="Advanced">Advanced</MenuItem>
                            </Select>
                            <Box
                                display="flex"
                                flexDirection={"row"}
                                alignItems={"center"}
                            >
                                <Button
                                    variant="contained"
                                    type="submit"
                                    color="primary"
                                    sx={{
                                        ...commonButtonStyles,
                                        width: 120,
                                    }}
                                    onClick={handleSave}
                                    spacing={10}
                                >
                                    Save
                                </Button>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    color="primary"
                                    sx={{
                                        ...commonButtonStyles,
                                        marginLeft: 2,
                                        width: 120,
                                    }}
                                    onClick={handleCancel}
                                    
                                >
                                    Cancel
                                </Button>
                            </Box>
                        </Box>
                    </form>
                </Box>
            </ThemeProvider>
        </>
    );
};

export default ProfileForm;
