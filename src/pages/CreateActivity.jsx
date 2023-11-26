import React from "react";
import {
    TextField,
    Button,
    MenuItem,
    AccordionSummary,
    AccordionDetails,
    Accordion, 
    Typography,
    Grid, 
    Select,
    InputLabel,
    FormControl,
    Box,
    ThemeProvider,
} from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { theme } from "../utils/theme";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const validationSchema = Yup.object({
});


const CreateActivity = () => {
    const navigate = useNavigate();
    
    const experienceLevel = ["Beginner", "Intermediate", "Advanced"];
    const venue = ["Indoor", "Outdoor", "Online"];

    const formik = useFormik({
        initialValues: {
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log("Form submitted:", values);
        },
    });

    const handleCancel = () => {
        navigate("/");
    };

    return (
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
                    {/* Box 1 -  Activity, Date, Time*/}
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="start"
                        marginBottom={3}
                    >
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
                        >
                            <InputLabel>Activity</InputLabel>
                            <Select
                                label="Activity"
                                name="activity"
                                value={formik.values.activity}
                                onChange={formik.handleChange}
                                sx={{
                                    width: "90%",

                                    marginBottom: 2,
                                    bgcolor: "#fff",
                                }}
                            >
                                <MenuItem value="Pickleball">
                                    Pickleball
                                </MenuItem>
                            </Select>
                        </FormControl>

                        {/* Date and Time */}
                        <Box
                            display="flex"
                            flexDirection="row"
                            justifyContent="start"
                            gap={5}
                            width="100%"
                        >
                            {/* Date */}
                            <TextField
                                sx={{
                                    bgcolor: "#fff",
                                    "& .MuiInputLabel-root.Mui-focused":
                                        theme.overrides.MuiInputLabel.root[
                                            "&.Mui-focused"
                                        ],
                                    "& .MuiOutlinedInput-root":
                                        theme.overrides.MuiOutlinedInput.root,
                                    width: "auto",
                                }}
                                label="Date"
                                type="date"
                                name="date"
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                                value={formik.values.date}
                                onChange={formik.handleChange}
                                marginRight={2}
                            />

                            {/* Time */}
                            <TextField
                                sx={{
                                    bgcolor: "#fff",
                                    "& .MuiInputLabel-root.Mui-focused":
                                        theme.overrides.MuiInputLabel.root[
                                            "&.Mui-focused"
                                        ],
                                    "& .MuiOutlinedInput-root":
                                        theme.overrides.MuiOutlinedInput.root,
                                    width: "auto",
                                }}
                                label="Time"
                                type="time"
                                name="timeField"
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                                value={formik.values.timeField}
                                onChange={formik.handleChange}
                            />
                        </Box>
                    </Box>

                    {/* Box 2 - Accordion - Address, City, State, ZipCode*/}
                    <Accordion sx={{ width: "90%", marginBottom: 3 }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel-content"
                            id="panel-header"
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
                                name="address"
                                variant="outlined"
                                fullWidth
                                size="small"
                                value={formik.values.address}
                                onChange={formik.handleChange}
                            />
                            {/* City */}
                            <TextField
                                label="City"
                                name="city"
                                variant="outlined"
                                fullWidth
                                size="small"
                                value={formik.values.city}
                                onChange={formik.handleChange}
                            />
                            {/* State */}
                            <TextField
                                label="State"
                                name="state"
                                variant="outlined"
                                fullWidth
                                size="small"
                                value={formik.values.state}
                                onChange={formik.handleChange}
                            />
                            {/* ZipCode */}
                            <TextField
                                label="Zip Code"
                                name="zipCode"
                                variant="outlined"
                                fullWidth
                                size="small"
                                value={formik.values.zipCode}
                                onChange={formik.handleChange}
                            />
                        </Box>
                    </Accordion>

                    {/* Box 3 - Venue, Participants, Experience, Fee  */}
                    <Grid container spacing={2} width="100%" marginBottom={2}>
                        <Grid item xs={4}>
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
                            >
                                <InputLabel>Venue</InputLabel>
                                <Select
                                    sx={{
                                        bgcolor: "#fff",
                                    }}
                                    label="venue"
                                    name="venue"
                                    value={formik.values.venue}
                                    onChange={formik.handleChange}
                                >
                                    {venue.map((level) => (
                                        <MenuItem key={level} value={level}>
                                            {level}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={7}>
                            <FormControl
                                sx={{
                                    "& .MuiInputLabel-root.Mui-focused":
                                        theme.overrides.MuiInputLabel.root[
                                            "&.Mui-focused"
                                        ],
                                    "& .MuiOutlinedInput-root":
                                        theme.overrides.MuiOutlinedInput.root,
                                    width: "70%",
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
                                    // onChange={handleChange}
                                    aria-label="Experience Level"
                                    // error={
                                    //     formik.touched.experienceLevel &&
                                    //     Boolean(formik.errors.experienceLevel)
                                    // }
                                    // {...formik.getFieldProps("experienceLevel")}
                                >
                                    {experienceLevel.map((level) => (
                                        <MenuItem key={level} value={level}>
                                            {level}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={5}>
                            <FormControl
                                sx={{
                                    "& .MuiInputLabel-root.Mui-focused":
                                        theme.overrides.MuiInputLabel.root[
                                            "&.Mui-focused"
                                        ],
                                    "& .MuiOutlinedInput-root":
                                        theme.overrides.MuiOutlinedInput.root,
                                    width: "100%",
                                }}
                                fullWidth
                            >
                                <InputLabel>Participants</InputLabel>
                                <Select
                                    sx={{
                                        bgcolor: "#fff",
                                    }}
                                    label="Participants"
                                    name="participants"
                                    value={formik.values.participants}
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
                        </Grid>
                        {/* <Grid item xs={7}>
                            <FormControl
                                sx={{
                                    "& .MuiInputLabel-root.Mui-focused":
                                        theme.overrides.MuiInputLabel.root[
                                            "&.Mui-focused"
                                        ],
                                    "& .MuiOutlinedInput-root":
                                        theme.overrides.MuiOutlinedInput.root,
                                    width: "70%",
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
                                    // onChange={handleChange}
                                    aria-label="Experience Level"
                                    // error={
                                    //     formik.touched.experienceLevel &&
                                    //     Boolean(formik.errors.experienceLevel)
                                    // }
                                    // {...formik.getFieldProps("experienceLevel")}
                                >
                                    {experienceLevel.map((level) => (
                                        <MenuItem key={level} value={level}>
                                            {level}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid> */}
                        <Grid item xs={4}>
                            <Box
                                display="flex"
                                flexDirection="row"
                                alignItems="center"
                            >
                                <AttachMoneyIcon sx={{ color: "#090759" }} />
                                <TextField
                                    sx={{
                                        bgcolor: "#fff",
                                        "& .MuiInputLabel-root.Mui-focused":
                                            theme.overrides.MuiInputLabel.root[
                                                "&.Mui-focused"
                                            ],
                                        "& .MuiOutlinedInput-root":
                                            theme.overrides.MuiOutlinedInput
                                                .root,
                                    }}
                                    label="Fee"
                                    name="fee"
                                    variant="outlined"
                                    fullWidth
                                    value={formik.values.fee}
                                    onChange={formik.handleChange}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                    {/* Box 4 -Accordion - First Name, Last Name, Phone Number, Email*/}
                    <Accordion sx={{ width: "90%", marginBottom: 3 }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            // aria-controls="panel2-content"
                            // id="panel2-header"
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
                            {/* Regular TextFields */}
                            <TextField
                                label="First Name"
                                name="firstName"
                                variant="outlined"
                                fullWidth
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                            />
                            <TextField
                                label="Last Name"
                                name="lastName"
                                variant="outlined"
                                fullWidth
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                            />
                            <TextField
                                label="Phone Number"
                                name="phoneNumber"
                                variant="outlined"
                                fullWidth
                                value={formik.values.phoneNumber}
                                onChange={formik.handleChange}
                            />
                            <TextField
                                label="Email"
                                name="email"
                                variant="outlined"
                                fullWidth
                                value={formik.values.email}
                                onChange={formik.handleChange}
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
                                onClick={handleCancel}
                                sx={{
                                    ...theme.commonButtonStyles,
                                    width: 120,
                                }}
                            >
                                Cancel
                            </Button>
                            {/* Create Button */}
                            <Button
                                variant="contained"
                                type="submit"
                                color="primary"
                                sx={{
                                    ...theme.commonButtonStyles,
                                    marginLeft: 5,
                                    width: 120,
                                }}
                            >
                                Create
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
                            // spacing={10}
                        >
                            Update Activity
                        </Button>
                    </Box>
                </form>
            </Box>
        </ThemeProvider>
    );
};

export default CreateActivity;
