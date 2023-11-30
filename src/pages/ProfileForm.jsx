import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    TextField,
    Button,
    MenuItem,
    Select,
    InputLabel,
    ThemeProvider,
    Box,
    FormControl,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { theme } from "../utils/theme";
import ProfileImage from "./ProfileImage";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const validationSchema = Yup.object({
    phoneNumber: Yup.string().matches(
        /^\d{10}$/,
        "Phone number must be 10 digits, no dashes"
    ),
    dateOfBirth: Yup.date()
        .nullable()
        .max(new Date(), "Date of birth must be in the past"),
    residentialAddress: Yup.object().shape({
        address: Yup.string(),
        city: Yup.string(),
        zipCode: Yup.string().matches(/^\d{5}$/, "Invalid zip code."),
        state: Yup.string().length(2, "State must be 2 letters"),
    }),
    experienceLevel: Yup.string().oneOf([
        "Beginner",
        "Intermediate",
        "Advanced",
    ]),
});

const experienceLevel = ["Beginner", "Intermediate", "Advanced"];

const ProfileForm = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            phoneNumber: "",
            dateOfBirth: "",
            residentialAddress: {
                address: "",
                city: "",
                state: "",
                zipCode: "",
            },
            // address: "",
            // city: "",
            // state: "",
            // zipCode: "",
            experienceLevel: "",
        },
        validationSchema: validationSchema,
        // onSubmit: async (values) => {

        //     console.log("Saved:", values);
        // },
    });

    useEffect(() => {
        const fetchUserData = async () => {
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
                
                if (res.data && res.data.user) {
                    const user = res.data.user;

                    const dateOfBirth = user.dateOfBirth
                        ? new Date(user.dateOfBirth)
                        : null;

                    formik.setValues({
                        ...user,
                        dateOfBirth: dateOfBirth
                            ? dateOfBirth.toISOString().split("T")[0]
                            : "",
                        residentialAddress: {
                            address: user.residentialAddress?.address || "",
                            city: user.residentialAddress?.city || "",
                            state: user.residentialAddress?.state || "",
                            zipCode: user.residentialAddress?.zipCode || "",
                        },
                    });
                }
                
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        formik.setValues({
            ...formik.values,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("jwtToken");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const userId = localStorage.getItem("userId");

        const dateOfBirth = formik.values.dateOfBirth;
        let convertedDateOfBirth = null;

            if (dateOfBirth) {
            const dateObject = new Date(dateOfBirth);
                const year = dateObject.getFullYear();
                const month = String(dateObject.getMonth() + 1).padStart(2, "0");
                const day = String(dateObject.getDate()).padStart(2, "0");
                convertedDateOfBirth = `${year}-${month}-${day}`;
            }

formik.setValues({
    ...formik.values,
dateOfBirth: convertedDateOfBirth,
});

        try {
            const updateUser = `${process.env.REACT_APP_BASE_URL}/api/v1/users/${userId}`;
            const res = await axios.patch(
                updateUser,
                {
                    ...formik.values,
                    residentialAddress: { ...formik.values.residentialAddress },
                },
                config
            );
            // const { data, statusText } = res
            // console.log(data)
            // if (statusText !== "Created") {
            //     throw new Error("Update User failed")
            //     }
            console.log("Saved successfully:", res.data);
            navigate("/");

        } catch (error) {
        toast.error("Update User failed. Please try again", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
})
    console.error("Error update user:", error)
        }
    };

    const handleCancel = () => {
        navigate("/");
    };

    const handleUpdatePassword = () => {
        navigate("/updatepassword");
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <Box
                    sx={{
                        minHeight: "100vh",
                        bgcolor: theme.palette.background.main,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <form onSubmit={formik.handleSubmit}>
                        <Box
                            display="flex"
                            flexDirection="column"
                            alignItems={"start"}
                            justifyContent="center"
                            margin={"auto"}
                            gap={1}
                            // padding={3}
                        >
                            <ProfileImage
                                userData={formik.values}
                                // firstName={userData.firstName}
                                // lastName={userData.lastName}
                            />

                            {/* Phone number */}
                            <TextField
                                size="small"
                                sx={{
                                    width: 280,
                                    bgcolor: "#fff",
                                    // width: "200",

                                    "& .MuiInputLabel-root.Mui-focused":
                                        theme.overrides.MuiInputLabel.root[
                                            "&.Mui-focused"
                                        ],
                                    "& .MuiOutlinedInput-root":
                                        theme.overrides.MuiOutlinedInput.root,
                                    // ...customizedLabelStyles,
                                }}
                                label="Phone Number"
                                name="phoneNumber"
                                id="outlined"
                                variant="outlined"
                                value={formik.values.phoneNumber}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.phoneNumber &&
                                    Boolean(formik.errors.phoneNumber)
                                }
                                helperText={
                                    formik.touched.phoneNumber &&
                                    formik.errors.phoneNumber
                                }
                                {...formik.getFieldProps("phoneNumber")}
                            />

                            {/* Date of Birth */}
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
                                    width: 280,
                                    "& .MuiInputLabel-root.Mui-focused":
                                        theme.overrides.MuiInputLabel.root[
                                            "&.Mui-focused"
                                        ],
                                    "& .MuiOutlinedInput-root":
                                        theme.overrides.MuiOutlinedInput.root,
                                }}
                                id="dateOfBirth"
                                size="small"
                                type="date"
                                name="dateOfBirth"
                                variant="outlined"
                                value={formik.values.dateOfBirth}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.dateOfBirth &&
                                    Boolean(formik.errors.dateOfBirth)
                                }
                                helperText={
                                    formik.touched.dateOfBirth &&
                                    formik.errors.dateOfBirth
                                }
                                {...formik.getFieldProps("dateOfBirth")}
                            />

                            {/* Address */}
                            <TextField
                                sx={{
                                    bgcolor: "#fff",
                                    width: 280,
                                    "& .MuiInputLabel-root.Mui-focused":
                                        theme.overrides.MuiInputLabel.root[
                                            "&.Mui-focused"
                                        ],
                                    "& .MuiOutlinedInput-root":
                                        theme.overrides.MuiOutlinedInput.root,
                                }}
                                label="Address"
                                name="residentialAddress.address"  
                                value={formik.values.residentialAddress.address}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                InputProps={{
                                placeholder: "Address",
                                }}
                                error={
                                formik.touched.residentialAddress?.address &&  
                                Boolean(formik.errors.residentialAddress?.address) 
                                }
                                helperText={
                                formik.touched.residentialAddress?.address && 
                                formik.errors.residentialAddress?.address  
                                }
                                {...formik.getFieldProps("residentialAddress.address")}  
                            />

                            {/* City */}
                            <TextField
                                sx={{
                                    bgcolor: "#fff",
                                    width: 280,
                                    "& .MuiInputLabel-root.Mui-focused":
                                        theme.overrides.MuiInputLabel.root[
                                            "&.Mui-focused"
                                        ],
                                    "& .MuiOutlinedInput-root":
                                        theme.overrides.MuiOutlinedInput.root,
                                }}
                                size="small"
                                label="City"
                                name="residentialAddress.city"  
                                value={formik.values.residentialAddress.city}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                InputProps={{
                                placeholder: "City",
                                }}
                                error={
                                formik.touched.residentialAddress?.city &&  
                                Boolean(formik.errors.residentialAddress?.city) 
                                }
                                helperText={
                                formik.touched.residentialAddress?.city && 
                                formik.errors.residentialAddress?.city  
                                }
                                {...formik.getFieldProps("residentialAddress.city")}  
                            />
                            {/* State */}
                            <TextField
                                sx={{
                                    bgcolor: "#fff",
                                    width: 280,
                                    "& .MuiInputLabel-root.Mui-focused":
                                        theme.overrides.MuiInputLabel.root[
                                            "&.Mui-focused"
                                        ],
                                    "& .MuiOutlinedInput-root":
                                        theme.overrides.MuiOutlinedInput.root,
                                }}
                                size="small"
                                label="State"
                                name="residentialAddress.state"  
                                value={formik.values.residentialAddress.state}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                InputProps={{
                                placeholder: "State",
                                }}
                                error={
                                formik.touched.residentialAddress?.state &&  
                                Boolean(formik.errors.residentialAddress?.state) 
                                }
                                helperText={
                                formik.touched.residentialAddress?.state && 
                                formik.errors.residentialAddress?.state  
                                }
                                {...formik.getFieldProps("residentialAddress.state")}  
                            />
                            {/* Zip Code */}
                            <TextField
                                sx={{
                                    width: 280,
                                    bgcolor: "#fff",

                                    "& .MuiInputLabel-root.Mui-focused":
                                        theme.overrides.MuiInputLabel.root[
                                            "&.Mui-focused"
                                        ],
                                    "& .MuiOutlinedInput-root":
                                        theme.overrides.MuiOutlinedInput.root,
                                }}
                                size="small"
                                label="Zip Code"
                                name="residentialAddress.zipCode"  
                                value={formik.values.residentialAddress.zipCode}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                InputProps={{
                                placeholder: "Zip Code",
                                }}
                                error={
                                formik.touched.residentialAddress?.zipCode &&  
                                Boolean(formik.errors.residentialAddress?.zipCode) 
                                }
                                helperText={
                                formik.touched.residentialAddress?.zipCode && 
                                formik.errors.residentialAddress?.zipCode  
                                }
                                {...formik.getFieldProps("residentialAddress.zipCode")}  
                                />
                            {/* Experience */}
                            <FormControl
                                sx={{
                                    "& .MuiInputLabel-root.Mui-focused":
                                        theme.overrides.MuiInputLabel.root[
                                            "&.Mui-focused"
                                        ],
                                    "& .MuiOutlinedInput-root":
                                        theme.overrides.MuiOutlinedInput.root,
                                    width: 280,
                                }}
                            >
                                <InputLabel>Experience</InputLabel>
                                <Select
                                    sx={{
                                        bgcolor: "#fff",
                                    }}
                                    label="Experience"
                                    name="experienceLevel"
                                    value={formik.values.experienceLevel}
                                    onChange={handleChange}
                                    onBlur={formik.handleBlur}
                                    InputProps={{
                                        placeholder: "Experience",
                                    }}
                                    error={
                                        formik.touched.experienceLevel &&
                                        Boolean(formik.errors.experienceLevel)
                                    }
                                    helperText={
                                        formik.touched.experienceLevel &&
                                        formik.errors.experienceLevel
                                    }
                                    {...formik.getFieldProps("experienceLevel")}
                                >
                                    {experienceLevel.map((level) => (
                                        <MenuItem key={level} value={level}>
                                            {level}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                marginTop={5}
                            >
                                <Box
                                    display="flex"
                                    flexDirection="row"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    {/* Cancel Button */}
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        color="primary"
                                        sx={{
                                            ...theme.commonButtonStyles,
                                            width: 120,
                                        }}
                                        onClick={handleCancel}
                                        spacing={10}
                                    >
                                        Cancel
                                    </Button>
                                    {/* Save Button */}
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        color="primary"
                                        sx={{
                                            ...theme.commonButtonStyles,
                                            marginLeft: 5,
                                            width: 120,
                                        }}
                                        onClick={handleSubmit}
                                    >
                                        Save
                                    </Button>
                                </Box>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    color="primary"
                                    sx={{
                                        ...theme.commonButtonStyles,
                                        width: 200,
                                        marginTop: 2,
                                    }}
                                    onClick={handleUpdatePassword}
                                    spacing={10}
                                >
                                    UPDATE PASSWORD
                                </Button>
                            </Box>
                        </Box>
                    </form>
                </Box>
            </ThemeProvider>
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

export default ProfileForm;
