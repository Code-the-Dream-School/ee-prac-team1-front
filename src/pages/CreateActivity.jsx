import * as Yup from "yup";

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    ThemeProvider,
    Typography,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Navbar from "../components/Navbar";
import React from "react";
import axios from "axios";
import { theme } from "../utils/theme";
import { useFormik } from "formik";
// import { useNavigate } from "react-router-dom";
// import Footer from "../components/Footer";

const validationSchema = Yup.object({
    activityType: Yup.string().required("Please select one of the activities"),
    date: Yup.date()
        .required("Date is required")
        .min(new Date(), "Date cannot be in the past"),
    time: Yup.string().required("Time is required"),
    maxPlayers: Yup.number()
        .required("Maximum of players is required")
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
    // const navigate = useNavigate();

    const experienceLevel = ["Beginner", "Intermediate", "Advanced"];
    const venue = ["Indoor", "Outdoor", "Online"];

    const formik = useFormik({
        initialValues: {
            activityType: "Pickleball",
            date: "",
            time: "",
            maxPlayers: "2",
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
                    onClose: () => {
                        window.location.href = '/';
                    }
                });
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
    //     navigate("/");
    // };

    return (
        <>
            <ThemeProvider theme={theme}>
                <Navbar />
                <Box
                    sx={{
                        minHeight: "100vh",
                        backgroundImage: theme.palette.background2.gradient,
                        backgroundSize: "cover",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <form onSubmit={formik.handleSubmit}>
                        {/* Box 1 -  Activity*/}
                        <FormControl
                            sx={{
                                "& .MuiInputLabel-root.Mui-focused":
                                    theme.overrides.MuiInputLabel.root[
                                        "&.Mui-focused"
                                    ],
                                "& .MuiOutlinedInput-root":
                                    theme.overrides.MuiOutlinedInput.root,
                            }}
                            fullWidth
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
                                // InputProps={{
                                //     placeholder: "Activity",
                                // }}

                                sx={{
                                    width: "90%",
                                    marginBottom: 2,
                                    bgcolor: "#fff",
                                }}
                            >
                                <MenuItem value="Pickleball">
                                    Pickleball
                                </MenuItem>
                                <MenuItem value="Tennis">Tennis</MenuItem>
                            </Select>
                        </FormControl>
                        <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="start"
                            marginBottom={3}
                        >
                            {/* Box 2 - Date, Time, Players */}
                            <Box
                                display="flex"
                                flexDirection="row"
                                justifyContent="space-between"
                                gap={3}
                                width="75%"
                            >
                                {/* Date */}
                                <TextField
                                    fullWidth
                                    sx={{
                                        bgcolor: "#fff",
                                        "& .MuiInputLabel-root.Mui-focused":
                                            theme.overrides.MuiInputLabel.root[
                                                "&.Mui-focused"
                                            ],
                                        "& .MuiOutlinedInput-root":
                                            theme.overrides.MuiOutlinedInput
                                                .root,
                                        // width: "auto",
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

                                {/* Time */}
                                <TextField
                                    fullWidth
                                    sx={{
                                        bgcolor: "#fff",
                                        "& .MuiInputLabel-root.Mui-focused":
                                            theme.overrides.MuiInputLabel.root[
                                                "&.Mui-focused"
                                            ],
                                        "& .MuiOutlinedInput-root":
                                            theme.overrides.MuiOutlinedInput
                                                .root,
                                        width: "70%",
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
                                {/* Players */}
                                <FormControl
                                    sx={{
                                        "& .MuiInputLabel-root.Mui-focused":
                                            theme.overrides.MuiInputLabel.root[
                                                "&.Mui-focused"
                                            ],
                                        "& .MuiOutlinedInput-root":
                                            theme.overrides.MuiOutlinedInput
                                                .root,
                                        width: "40%",
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
                                    <InputLabel>Players</InputLabel>
                                    <Select
                                        sx={{
                                            bgcolor: "#fff",
                                            width: "220%",
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
                                            <MenuItem key={value} value={value}>
                                                {value}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>

                        {/* Box 3 - Accordion - Address, City, State, ZipCode*/}
                        <Accordion sx={{ width: "90%", marginBottom: 3 }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                // aria-controls="panel-content"
                                // id="panel-header"
                            >
                                <Typography>Location</Typography>
                            </AccordionSummary>
                            <AccordionDetails
                                sx={{
                                    width: "100%",
                                }}
                            ></AccordionDetails>
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="start"
                                width="80%"
                                marginBottom={3}
                                marginLeft={5}
                            >
                                {/* Address */}
                                <TextField
                                    label="Address"
                                    name="location.address"
                                    variant="outlined"
                                    fullWidth
                                    // size="small"
                                    value={formik.values.location.address}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    // InputProps={{
                                    //     placeholder: "Address",
                                    // }}
                                    error={
                                        formik.touched.location?.address &&
                                        Boolean(formik.errors.location?.address)
                                    }
                                    helperText={
                                        formik.touched.location?.address &&
                                        formik.errors.location?.address
                                    }
                                    {...formik.getFieldProps(
                                        "location.address"
                                    )}
                                />
                                {/* City */}
                                <TextField
                                    label="City"
                                    name="location.city"
                                    variant="outlined"
                                    fullWidth
                                    // size="small"
                                    value={formik.values.location.city}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    // InputProps={{
                                    //     placeholder: "City",
                                    // }}
                                    error={
                                        formik.touched.location?.city &&
                                        Boolean(formik.errors.location?.city)
                                    }
                                    helperText={
                                        formik.touched.location?.city &&
                                        formik.errors.location?.city
                                    }
                                    {...formik.getFieldProps("location.city")}
                                />
                                {/* State */}
                                <TextField
                                    label="State"
                                    name="location.state"
                                    variant="outlined"
                                    fullWidth
                                    // size="small"
                                    value={formik.values.location.state}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    // InputProps={{
                                    //     placeholder: "State",
                                    // }}
                                    error={
                                        formik.touched.location?.state &&
                                        Boolean(formik.errors.location?.state)
                                    }
                                    helperText={
                                        formik.touched.location?.state &&
                                        formik.errors.location?.state
                                    }
                                    {...formik.getFieldProps("location.state")}
                                />
                                {/* ZipCode */}
                                <TextField
                                    label="Zip Code"
                                    name="location.zipCode"
                                    variant="outlined"
                                    fullWidth
                                    // size="small"
                                    value={formik.values.location.zipCode}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    // InputProps={{
                                    //     placeholder: "Zip Code",
                                    // }}
                                    error={
                                        formik.touched.location?.zipCode &&
                                        Boolean(formik.errors.location?.zipCode)
                                    }
                                    helperText={
                                        formik.touched.location?.zipCode &&
                                        formik.errors.location?.zipCode
                                    }
                                    {...formik.getFieldProps(
                                        "location.zipCode"
                                    )}
                                />
                            </Box>
                        </Accordion>

                        {/* Box 4 - Venue, Experience, Fee  */}
                        <Box
                            display="flex"
                            flexDirection="row"
                            justifyContent="end"
                            marginBottom={3}
                            gap={5}
                            width="75%"
                        >
                            {/* Venue */}
                            <FormControl
                                fullWidth
                                sx={{
                                    // width: "90%",
                                    "& .MuiInputLabel-root.Mui-focused":
                                        theme.overrides.MuiInputLabel.root[
                                            "&.Mui-focused"
                                        ],
                                    "& .MuiOutlinedInput-root":
                                        theme.overrides.MuiOutlinedInput.root,
                                }}
                                error={
                                    formik.touched.venue &&
                                    Boolean(formik.errors.venue)
                                }
                                helperText={
                                    formik.touched.venue && formik.errors.venue
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
                                    // InputProps={{
                                    //     placeholder: "Venue",
                                    // }}
                                >
                                    {venue.map((level) => (
                                        <MenuItem key={level} value={level}>
                                            {level}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {/* Experience */}
                            <FormControl
                                // fullWidth
                                sx={{
                                    width: "120%",
                                    "& .MuiInputLabel-root.Mui-focused":
                                        theme.overrides.MuiInputLabel.root[
                                            "&.Mui-focused"
                                        ],
                                    "& .MuiOutlinedInput-root":
                                        theme.overrides.MuiOutlinedInput.root,
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
                                <InputLabel>Experience</InputLabel>
                                <Select
                                    sx={{
                                        bgcolor: "#fff",
                                    }}
                                    label="Experience"
                                    name="experienceLevel"
                                    value={formik.values.experienceLevel}
                                    onChange={formik.handleChange}
                                    aria-label="Experience Level"
                                >
                                    {experienceLevel.map((level) => (
                                        <MenuItem key={level} value={level}>
                                            {level}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {/* Fee */}

                            <Box
                                display="flex"
                                flexDirection="row"
                                alignItems="center"
                                justifyContent="end"
                                // gap={1}
                                width="70%"
                            >
                                <AttachMoneyIcon sx={{ color: "#090759" }} />
                                <TextField
                                    sx={{
                                        bgcolor: "#fff",
                                        // width: "130%",
                                        "& .MuiInputLabel-root.Mui-focused":
                                            theme.overrides.MuiInputLabel.root[
                                                "&.Mui-focused"
                                            ],
                                        "& .MuiOutlinedInput-root":
                                            theme.overrides.MuiOutlinedInput
                                                .root,
                                    }}
                                    label="Fee"
                                    name="fees"
                                    variant="outlined"
                                    // fullWidth
                                    value={formik.values.fees}
                                    onChange={formik.handleChange}
                                />
                            </Box>
                        </Box>

                        {/* Box 5 -Accordion - First Name, Last Name, Phone Number, Email*/}
                        <Accordion sx={{ width: "90%", marginBottom: 3 }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography>Contact</Typography>
                            </AccordionSummary>

                            <AccordionDetails
                                sx={{
                                    width: 400,
                                }}
                            ></AccordionDetails>
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="start"
                                width="80%"
                                marginBottom={3}
                                marginLeft={5}
                            >
                                <TextField
                                    label="First Name"
                                    name="firstName"
                                    variant="outlined"
                                    fullWidth
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.firstName &&
                                        Boolean(formik.errors.firstName)
                                    }
                                    helperText={
                                        formik.touched.firstName &&
                                        formik.errors.firstName
                                    }
                                    {...formik.getFieldProps("firstName")}
                                />
                                <TextField
                                    label="Last Name"
                                    name="lastName"
                                    variant="outlined"
                                    fullWidth
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.lastName &&
                                        Boolean(formik.errors.lastName)
                                    }
                                    helperText={
                                        formik.touched.lastName &&
                                        formik.errors.lastName
                                    }
                                    {...formik.getFieldProps("lastName")}
                                />
                                <TextField
                                    label="Phone Number"
                                    name="contactPhoneNum"
                                    variant="outlined"
                                    fullWidth
                                    value={formik.values.contactPhoneNum}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched.contactPhoneNum &&
                                        Boolean(formik.errors.contactPhoneNum)
                                    }
                                    helperText={
                                        formik.touched.contactPhoneNum &&
                                        formik.errors.contactPhoneNum
                                    }
                                    {...formik.getFieldProps("contactPhoneNum")}
                                />
                                <TextField
                                    label="Email"
                                    name="contactEmail"
                                    variant="outlined"
                                    fullWidth
                                    value={formik.values.contactEmail}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.contactEmail &&
                                        Boolean(formik.errors.contactEmail)
                                    }
                                    helperText={
                                        formik.touched.contactEmail &&
                                        formik.errors.contactEmail
                                    }
                                    {...formik.getFieldProps("contactEmail")}
                                />
                            </Box>
                        </Accordion>

                        {/* Notes */}
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

                                "& .MuiInputLabel-root.Mui-focused":
                                    theme.overrides.MuiInputLabel.root[
                                        "&.Mui-focused"
                                    ],
                                "& .MuiOutlinedInput-root":
                                    theme.overrides.MuiOutlinedInput.root,
                            }}
                        />
                        {/* Buttons */}
                        {/* Create Button */}
                        <Button
                            variant="contained"
                            type="submit"
                            color="primary"
                            fullWidth
                            sx={{
                                ...theme.commonButtonStyles,
                                marginTop: 3,
                                width: "90%",
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
            {/* <Footer /> */}
        </>
    );
};

export default CreateActivity;
