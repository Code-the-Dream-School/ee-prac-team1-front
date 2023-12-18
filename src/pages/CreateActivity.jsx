import * as Yup from "yup";

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    ThemeProvider,
    Typography,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";

// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import React from "react";
import axios from "axios";
import { theme } from "../utils/theme";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
    activityType: Yup.string().required("Please select one of the activities"),
    date: Yup.date()
        .required("Date is required")
        .min(new Date(new Date().setHours(0, 0, 0, 0)), "Date cannot be in the past"),
    time: Yup.string().required("Time is required"),
    maxPlayers: Yup.number()
        .required("Maximum of players is required")
        .min(2, "At least 2 participants are required"),
    minPlayers: Yup.number()
        .required("Minimum of players is required")
        .min(2, "At least 2 participants are required"),
    location: Yup.object().shape({
        address: Yup.string().required("Address is required"),
        city: Yup.string().required("City is required"),
        state: Yup.string()
            .required("State is required")
            .length(2, "State must be 2 characters"),
        zipCode: Yup.string()
            .required("Zip Code is required")
            .matches(/^\d{5}$/, "Invalid zip code."),
    }),
    venue: Yup.string()
        .required("Venue is required")
        .oneOf(["Indoor", "Outdoor", "Online"], "Please select a valid venue"),
    experienceLevel: Yup.string()
        .required("Experience Level is required")
        .oneOf(
            ["Beginner", "Intermediate", "Advanced"],
            "Please select an experience level"
        ),
    fees: Yup.string(),
    firstName: Yup.string()
        .required("First Name is required")
        .min(2, "First Name should be at least 2 characters"),
    lastName: Yup.string()
        .required("Last Name is required")
        .min(2, "Last Name should be at least 2 characters"),
    contactPhoneNum: Yup.string()
        .required("Phone Number is required")
        .matches(/^\d{10}$/, "Phone number must be 10 digits, no dashes"),
    contactEmail: Yup.string()
        .required("Email is required")
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
    notes: Yup.string(),
});

const CreateActivity = () => {
    const navigate = useNavigate();

    const experienceLevel = ["Beginner", "Intermediate", "Advanced"];
    const venue = ["Indoor", "Outdoor", "Online"];

    const formik = useFormik({
        initialValues: {
            activityType: "Pickleball",
            date: "",
            time: "",
            minPlayers: "2",
            maxPlayers: "20",
            location: {
                address: "",
                city: "",
                state: "",
                zipCode: "",
            },
            // Coordinates: " lat: 42.4547874, lng: -71.06546999999999 ",
            venue: "Indoor",
            experienceLevel: "Beginner",
            firstName: "",
            lastName: "",
            contactPhoneNum: "",
            contactEmail: "",
            notes: "",
            fees: "",
        },

        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const jwtToken = localStorage.getItem("jwtToken");

                let convertedDate = new Date(values.date)
                    .toISOString()
                    .split("T")[0];

                if (values.date) {
                    const dateObject = new Date(values.date);
                    const year = dateObject.getFullYear();
                    const month = String(dateObject.getMonth() + 1).padStart(
                        2,
                        "0"
                    );
                    const day = String(dateObject.getDate()).padStart(2, "0");
                    convertedDate = `${year}-${month}-${day}`;
                }

                const res = await axios.post(
                    `${process.env.REACT_APP_BASE_URL}/api/v1/activities/myActivities`,
                    {
                        activityType: values.activityType,
                        date: convertedDate,
                        time: values.time,
                        minPlayers: values.minPlayers,
                        maxPlayers: values.maxPlayers,
                        location: {
                            address: values.location.address.toUpperCase(),
                            city: values.location.city.toUpperCase(),
                            state: values.location.state.toUpperCase(),
                            zipCode: values.location.zipCode.toUpperCase(),
                        },
                        venue: values.venue.toLowerCase(),
                        experienceLevel: values.experienceLevel,
                        contactName: `${values.firstName} ${values.lastName}`,
                        contactPhoneNum: values.contactPhoneNum,
                        contactEmail: values.contactEmail,
                        fees: values.fees,
                        notes: values.notes,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${jwtToken}`,
                        },
                    }
                );
                console.log("Activity was successfully created:", res.data);
                toast.success("Your activity was successfully created!", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                    await new Promise((resolve) => setTimeout(resolve, 1500)); 
                    navigate('/dashboard');
            } catch (error) {
                toast.error(
                    "Create activity was failed. Please enter valid data and try again.",
                    {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    }
                );
                console.error("Error:", error.message);
            }
        },
    });

    const handleChange = (e) => {
        formik.setValues({
            ...formik.values,
            [e.target.name]: e.target.value,
        });
    };

    // const handleCancel = () => {
    //     navigate("/dashboard");
    // };

    return (
        <>
            <Navbar />
            <ThemeProvider theme={theme}>
                {/* <Box
                    sx={{
                        minHeight: "100vh",
                        backgroundImage: theme.palette.background2.gradient,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                > */}
                <form onSubmit={formik.handleSubmit}>
                    {/* <Box
                            display="flex"
                            flexDirection="column"
                            alignItems={"start"}
                            justifyContent="center"
                            margin={"auto"}
                            gap={1}
                            // padding={3}
                        > */}
                    <Grid
                        sx={{
                            backgroundImage: theme.palette.background2.gradient,
                        }}
                        container
                        justifyContent="center"
                        alignItems="center"
                        minHeight="100vh"
                    >
                        <Grid item xs={12} md={6}>
                            {/* Box 1 -  Activity*/}
                            <FormControl
                                sx={{
                                    width: "90%",

                                    "& .MuiInputLabel-root.Mui-focused":
                                        theme.overrides.MuiInputLabel.root[
                                            "&.Mui-focused"
                                        ],
                                    "& .MuiOutlinedInput-root":
                                        theme.overrides.MuiOutlinedInput.root,
                                    marginBottom: 3,
                                    marginTop: 3,
                                    marginLeft: 2,
                                }}
                                // fullWidth
                                error={
                                    formik.touched.activityType &&
                                    Boolean(formik.errors.activityType)
                                }
                                helperText={
                                    formik.touched.activityType &&
                                    formik.errors.activityType
                                }
                                {...formik.getFieldProps("activityType")}
                            >
                                <InputLabel>Activity</InputLabel>

                                <Select
                                    label="Activity"
                                    name="activityType"
                                    value={formik.values.activityType}
                                    onChange={handleChange}
                                    onBlur={formik.handleBlur}
                                    sx={{
                                        bgcolor: "#fff",
                                    }}
                                >
                                    <MenuItem value="Pickleball">
                                        Pickleball
                                    </MenuItem>
                                    <MenuItem value="Tennis">Tennis</MenuItem>
                                </Select>
                            </FormControl>
                            {/* Box 2 - Date, Time, Players */}
                            {/* Date */}
                            <Grid container spacing={2} sx={{ mb: 2 }}>
                                <Grid item xs={12} md={3}>
                                    <TextField
                                        // fullWidth
                                        sx={{
                                            bgcolor: "#fff",
                                            "& .MuiInputLabel-root.Mui-focused":
                                                theme.overrides.MuiInputLabel
                                                    .root["&.Mui-focused"],
                                            "& .MuiOutlinedInput-root":
                                                theme.overrides.MuiOutlinedInput
                                                    .root,
                                            width: "70%",
                                            marginLeft: 2,
                                        }}
                                        label="Date"
                                        type="date"
                                        name="date"
                                        variant="outlined"
                                        InputLabelProps={{ shrink: true }}
                                        marginRight={2}
                                        value={formik.values.date}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={
                                            formik.touched.date &&
                                            Boolean(formik.errors.date)
                                        }
                                        helperText={
                                            formik.touched.date &&
                                            formik.errors.date
                                        }
                                        {...formik.getFieldProps("date")}
                                    />
                                </Grid>
                                {/* Time */}
                                <Grid item xs={12} md={3}>
                                    <TextField
                                        sx={{
                                            bgcolor: "#fff",
                                            width: "50%",
                                            marginLeft: 2,
                                            "& .MuiInputLabel-root.Mui-focused":
                                                theme.overrides.MuiInputLabel
                                                    .root["&.Mui-focused"],
                                            "& .MuiOutlinedInput-root":
                                                theme.overrides.MuiOutlinedInput
                                                    .root,
                                        }}
                                        label="Time"
                                        type="time"
                                        name="time"
                                        variant="outlined"
                                        InputLabelProps={{ shrink: true }}
                                        value={formik.values.time}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={
                                            formik.touched.time &&
                                            Boolean(formik.errors.time)
                                        }
                                        helperText={
                                            formik.touched.time &&
                                            formik.errors.time
                                        }
                                        {...formik.getFieldProps("time")}
                                    />
                                </Grid>
                                {/* Players */}
                                {/* Minimum */}
                                <Grid item xs={12} md={3}>
                                    <FormControl
                                        sx={{
                                            "& .MuiInputLabel-root.Mui-focused":
                                                theme.overrides.MuiInputLabel
                                                    .root["&.Mui-focused"],
                                            "& .MuiOutlinedInput-root":
                                                theme.overrides.MuiOutlinedInput
                                                    .root,
                                            width: "50%",
                                            marginLeft: 2,
                                        }}
                                        error={
                                            formik.touched.minPlayers &&
                                            Boolean(formik.errors.minPlayers)
                                        }
                                        helperText={
                                            formik.touched.minPlayers &&
                                            formik.errors.minPlayers
                                        }
                                        {...formik.getFieldProps("minPlayers")}
                                    >
                                        <InputLabel>Min Players</InputLabel>
                                        <Select
                                            sx={{
                                                bgcolor: "#fff",
                                            }}
                                            label="Players"
                                            name="minPlayers"
                                            value={formik.values.minPlayers}
                                            onChange={formik.handleChange}
                                            inputProps={{
                                                min: 2,
                                                max: 20,
                                            }}
                                        >
                                            {Array.from(
                                                { length: 19 },
                                                (_, index) => index + 2
                                            ).map((value) => (
                                                <MenuItem
                                                    key={value}
                                                    value={value}
                                                >
                                                    {value}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                {/* Maximum */}
                                <Grid item xs={12} md={3}>
                                    <FormControl
                                        sx={{
                                            "& .MuiInputLabel-root.Mui-focused":
                                                theme.overrides.MuiInputLabel
                                                    .root["&.Mui-focused"],
                                            "& .MuiOutlinedInput-root":
                                                theme.overrides.MuiOutlinedInput
                                                    .root,
                                            width: "50%",
                                            marginLeft: 2,
                                        }}
                                        error={
                                            formik.touched.maxPlayers &&
                                            Boolean(formik.errors.maxPlayers)
                                        }
                                        helperText={
                                            formik.touched.maxPlayers &&
                                            formik.errors.maxPlayers
                                        }
                                        {...formik.getFieldProps("maxPlayers")}
                                    >
                                        <InputLabel>Max Players</InputLabel>
                                        <Select
                                            sx={{
                                                bgcolor: "#fff",
                                            }}
                                            label="Players"
                                            name="maxPlayers"
                                            value={formik.values.maxPlayers}
                                            onChange={formik.handleChange}
                                            inputProps={{
                                                min: 2,
                                                max: 20,
                                            }}
                                        >
                                            {Array.from(
                                                { length: 19 },
                                                (_, index) => index + 2
                                            ).map((value) => (
                                                <MenuItem
                                                    key={value}
                                                    value={value}
                                                >
                                                    {value}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            {/* Box 3 - Accordion - Address, City, State, ZipCode*/}
                            <Accordion
                                sx={{
                                    width: "90%",
                                    marginBottom: 3,
                                    marginLeft: 2,
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <Typography>Location</Typography>
                                </AccordionSummary>
                                <AccordionDetails
                                    sx={{
                                        width: "50%",
                                        marginLeft: 5,
                                    }}
                                >
                                    {/* <Box
                                        display="flex"
                                        flexDirection="column"
                                        alignItems="start"
                                        width="80%"
                                        marginBottom={3}
                                        marginLeft={5}
                                    > */}
                                    <Grid container justifyContent="center">
                                        <Grid item xs={12}>
                                            <Box
                                                display="flex"
                                                flexDirection="column"
                                                alignItems="center"
                                                width="100%"
                                            >
                                                {/* Address */}
                                                <TextField
                                                    label="Address"
                                                    name="location.address"
                                                    variant="outlined"
                                                    fullWidth
                                                    // size="small"
                                                    value={
                                                        formik.values.location
                                                            .address
                                                    }
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    // InputProps={{
                                                    //     placeholder: "Address",
                                                    // }}
                                                    error={
                                                        formik.touched.location
                                                            ?.address &&
                                                        Boolean(
                                                            formik.errors
                                                                .location
                                                                ?.address
                                                        )
                                                    }
                                                    helperText={
                                                        formik.touched.location
                                                            ?.address &&
                                                        formik.errors.location
                                                            ?.address
                                                    }
                                                    {...formik.getFieldProps(
                                                        "location.address"
                                                    )}
                                                />
                                            </Box>
                                        </Grid>
                                        {/* City */}
                                        <Grid item xs={12}>
                                            <Box
                                                display="flex"
                                                flexDirection="column"
                                                alignItems="center"
                                                width="100%"
                                            >
                                                <TextField
                                                    label="City"
                                                    name="location.city"
                                                    variant="outlined"
                                                    fullWidth
                                                    // size="small"
                                                    value={
                                                        formik.values.location
                                                            .city
                                                    }
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    // InputProps={{
                                                    //     placeholder: "City",
                                                    // }}
                                                    error={
                                                        formik.touched.location
                                                            ?.city &&
                                                        Boolean(
                                                            formik.errors
                                                                .location?.city
                                                        )
                                                    }
                                                    helperText={
                                                        formik.touched.location
                                                            ?.city &&
                                                        formik.errors.location
                                                            ?.city
                                                    }
                                                    {...formik.getFieldProps(
                                                        "location.city"
                                                    )}
                                                />
                                            </Box>
                                        </Grid>
                                        {/* State */}
                                        <Grid item xs={12}>
                                            <Box
                                                display="flex"
                                                flexDirection="column"
                                                alignItems="center"
                                                width="100%"
                                            >
                                                <TextField
                                                    label="State"
                                                    name="location.state"
                                                    variant="outlined"
                                                    fullWidth
                                                    // size="small"
                                                    value={
                                                        formik.values.location
                                                            .state
                                                    }
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    // InputProps={{
                                                    //     placeholder: "State",
                                                    // }}
                                                    error={
                                                        formik.touched.location
                                                            ?.state &&
                                                        Boolean(
                                                            formik.errors
                                                                .location?.state
                                                        )
                                                    }
                                                    helperText={
                                                        formik.touched.location
                                                            ?.state &&
                                                        formik.errors.location
                                                            ?.state
                                                    }
                                                    {...formik.getFieldProps(
                                                        "location.state"
                                                    )}
                                                />
                                            </Box>
                                        </Grid>
                                        {/* ZipCode */}
                                        <Grid item xs={12}>
                                            <Box
                                                display="flex"
                                                flexDirection="column"
                                                alignItems="center"
                                                width="100%"
                                            >
                                                <TextField
                                                    label="Zip Code"
                                                    name="location.zipCode"
                                                    variant="outlined"
                                                    fullWidth
                                                    // size="small"
                                                    value={
                                                        formik.values.location
                                                            .zipCode
                                                    }
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    error={
                                                        formik.touched.location
                                                            ?.zipCode &&
                                                        Boolean(
                                                            formik.errors
                                                                .location
                                                                ?.zipCode
                                                        )
                                                    }
                                                    helperText={
                                                        formik.touched.location
                                                            ?.zipCode &&
                                                        formik.errors.location
                                                            ?.zipCode
                                                    }
                                                    {...formik.getFieldProps(
                                                        "location.zipCode"
                                                    )}
                                                />
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>

                            {/* Box 4 - Venue, Experience, Fee  */}
                            {/* Venue */}
                            <Grid container spacing={2} sx={{ mb: 2 }}>
                                <Grid item xs={12} md={4}>
                                    <FormControl
                                        // fullWidth
                                        sx={{
                                            width: "50%",
                                            marginLeft: 2,
                                            "& .MuiInputLabel-root.Mui-focused":
                                                theme.overrides.MuiInputLabel
                                                    .root["&.Mui-focused"],
                                            "& .MuiOutlinedInput-root":
                                                theme.overrides.MuiOutlinedInput
                                                    .root,
                                        }}
                                        error={
                                            formik.touched.venue &&
                                            Boolean(formik.errors.venue)
                                        }
                                        helperText={
                                            formik.touched.venue &&
                                            formik.errors.venue
                                        }
                                        {...formik.getFieldProps("venue")}
                                    >
                                        <InputLabel>Venue</InputLabel>
                                        <Select
                                            sx={{
                                                bgcolor: "#fff",
                                            }}
                                            label="Venue"
                                            name="venue"
                                            value={formik.values.venue}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        >
                                            {venue.map((level) => (
                                                <MenuItem
                                                    key={level}
                                                    value={level}
                                                >
                                                    {level}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                {/* Experience */}
                                <Grid item xs={12} md={4}>
                                    <FormControl
                                        // fullWidth
                                        sx={{
                                            width: "50%",
                                            marginLeft: 2,
                                            "& .MuiInputLabel-root.Mui-focused":
                                                theme.overrides.MuiInputLabel
                                                    .root["&.Mui-focused"],
                                            "& .MuiOutlinedInput-root":
                                                theme.overrides.MuiOutlinedInput
                                                    .root,
                                        }}
                                        error={
                                            formik.touched.experienceLevel &&
                                            Boolean(
                                                formik.errors.experienceLevel
                                            )
                                        }
                                        helperText={
                                            formik.touched.experienceLevel &&
                                            formik.errors.experienceLevel
                                        }
                                        {...formik.getFieldProps(
                                            "experienceLevel"
                                        )}
                                    >
                                        <InputLabel>Experience</InputLabel>
                                        <Select
                                            sx={{
                                                bgcolor: "#fff",
                                            }}
                                            label="Experience"
                                            name="experienceLevel"
                                            value={
                                                formik.values.experienceLevel
                                            }
                                            onChange={formik.handleChange}
                                            aria-label="Experience Level"
                                        >
                                            {experienceLevel.map((level) => (
                                                <MenuItem
                                                    key={level}
                                                    value={level}
                                                >
                                                    {level}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                {/* Fee */}
                                <Grid item xs={12} md={4}>
                                    {/* <Box
                                        display="flex"
                                        flexDirection="row"
                                        alignItems="center"
                                        justifyContent="flex-end"
                                        // gap={1}
                                        // width="70%"
                                    > */}
                                    {/* <AttachMoneyIcon
                                        sx={{ color: "#090759" }}
                                    /> */}
                                    <TextField
                                        sx={{
                                            bgcolor: "#fff",
                                            "& .MuiInputLabel-root.Mui-focused":
                                                theme.overrides.MuiInputLabel
                                                    .root["&.Mui-focused"],
                                            "& .MuiOutlinedInput-root":
                                                theme.overrides.MuiOutlinedInput
                                                    .root,
                                            width: "30%",
                                            marginLeft: 2,
                                        }}
                                        label="Fee $"
                                        name="fees"
                                        variant="outlined"
                                        // fullWidth
                                        value={formik.values.fees}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                            </Grid>

                            {/* Box 5 -Accordion - First Name, Last Name, Phone Number, Email*/}
                            <Accordion
                                sx={{
                                    width: "90%",
                                    marginBottom: 3,
                                    marginLeft: 2,
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <Typography>Contact</Typography>
                                </AccordionSummary>

                                <AccordionDetails
                                    sx={{
                                        width: "50%",
                                        marginLeft: 5,
                                    }}
                                >
                                    <Grid container justifyContent="center">
                                        <Grid item xs={12}>
                                            <Box
                                                display="flex"
                                                flexDirection="column"
                                                alignItems="center"
                                                width="100%"
                                            >
                                                {/* <Box
                                        display="flex"
                                        flexDirection="column"
                                        alignItems="start"
                                        width="80%"
                                        marginBottom={3}
                                        marginLeft={5}
                                    > */}
                                                <TextField
                                                    label="First Name"
                                                    name="firstName"
                                                    variant="outlined"
                                                    fullWidth
                                                    value={
                                                        formik.values.firstName
                                                    }
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    error={
                                                        formik.touched
                                                            .firstName &&
                                                        Boolean(
                                                            formik.errors
                                                                .firstName
                                                        )
                                                    }
                                                    helperText={
                                                        formik.touched
                                                            .firstName &&
                                                        formik.errors.firstName
                                                    }
                                                    {...formik.getFieldProps(
                                                        "firstName"
                                                    )}
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Box
                                                display="flex"
                                                flexDirection="column"
                                                alignItems="center"
                                                width="100%"
                                            >
                                                <TextField
                                                    label="Last Name"
                                                    name="lastName"
                                                    variant="outlined"
                                                    fullWidth
                                                    value={
                                                        formik.values.lastName
                                                    }
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    error={
                                                        formik.touched
                                                            .lastName &&
                                                        Boolean(
                                                            formik.errors
                                                                .lastName
                                                        )
                                                    }
                                                    helperText={
                                                        formik.touched
                                                            .lastName &&
                                                        formik.errors.lastName
                                                    }
                                                    {...formik.getFieldProps(
                                                        "lastName"
                                                    )}
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Box
                                                display="flex"
                                                flexDirection="column"
                                                alignItems="center"
                                                width="100%"
                                            >
                                                <TextField
                                                    label="Phone Number"
                                                    name="contactPhoneNum"
                                                    variant="outlined"
                                                    fullWidth
                                                    value={
                                                        formik.values
                                                            .contactPhoneNum
                                                    }
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    error={
                                                        formik.touched
                                                            .contactPhoneNum &&
                                                        Boolean(
                                                            formik.errors
                                                                .contactPhoneNum
                                                        )
                                                    }
                                                    helperText={
                                                        formik.touched
                                                            .contactPhoneNum &&
                                                        formik.errors
                                                            .contactPhoneNum
                                                    }
                                                    {...formik.getFieldProps(
                                                        "contactPhoneNum"
                                                    )}
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Box
                                                display="flex"
                                                flexDirection="column"
                                                alignItems="center"
                                                width="100%"
                                            >
                                                <TextField
                                                    label="Email"
                                                    name="contactEmail"
                                                    variant="outlined"
                                                    fullWidth
                                                    value={
                                                        formik.values
                                                            .contactEmail
                                                    }
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    error={
                                                        formik.touched
                                                            .contactEmail &&
                                                        Boolean(
                                                            formik.errors
                                                                .contactEmail
                                                        )
                                                    }
                                                    helperText={
                                                        formik.touched
                                                            .contactEmail &&
                                                        formik.errors
                                                            .contactEmail
                                                    }
                                                    {...formik.getFieldProps(
                                                        "contactEmail"
                                                    )}
                                                />
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                            {/* Notes */}
                            <Grid item xs={12}>
                                <TextField
                                    label="Notes"
                                    name="notes"
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                    value={formik.values.notes}
                                    onChange={formik.handleChange}
                                    marginBottom={3}
                                    fullWidth
                                    sx={{
                                        width: "90%",
                                        bgcolor: "#fff",
                                        marginLeft: 2,

                                        "& .MuiInputLabel-root.Mui-focused":
                                            theme.overrides.MuiInputLabel.root[
                                                "&.Mui-focused"
                                            ],
                                        "& .MuiOutlinedInput-root":
                                            theme.overrides.MuiOutlinedInput
                                                .root,
                                    }}
                                />
                            </Grid>

                            <Button
                                variant="contained"
                                type="submit"
                                color="primary"
                                fullWidth
                                sx={{
                                    ...theme.commonButtonStyles,
                                    marginTop: 3,
                                    width: "90%",
                                    marginLeft: 2,
                                }}
                            >
                                Create
                            </Button>
                            {/* Update Activity Button */}
                            {/* <Button
                                variant="contained"
                                type="submit"
                                color="primary"
                                sx={{
                                    ...theme.commonButtonStyles,
                                    width: 200,
                                    marginTop: 2,
                                }}
                                // spacing={10}
                            >
                                Update Activity
                            </Button> */}
                            {/* </Box> */}
                        </Grid>
                    </Grid>
                    {/* </Box> */}
                </form>
                {/* </Box> */}
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
            <Footer />
        </>
    );
};

export default CreateActivity;