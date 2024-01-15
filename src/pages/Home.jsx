import * as yup from "yup";

import {
    Box,
    Button,
    Container,
    TextField,
    ThemeProvider,
    Typography,
} from "@mui/material";

import LandingMobile from "../assets/mob430.png";
import Logo from "../assets/logo150.png";
import React from "react";
import { theme } from "../utils/theme";
import { useFormik } from "formik";

const validationSchema = yup.object({
    zipCode: yup
        .string()
        .required("Zip Code is required")
        .matches(/^\d{5}$/, "Invalid Zip Code"),
});

const Home = () => {
    const formik = useFormik({
        initialValues: {
            zipCode: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
        },
    });

    return (
        <>
            <ThemeProvider theme={theme}>
                <Container
                    sx={{
                        textAlign: "center",
                        width: "495px",
                        margin: "auto",
                        // marginTop: "10px",
                    }}
                >
                    {/* Logo */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <img
                            src={Logo}
                            alt="Player Buddy Logo"
                            style={{ width: "20%", height: "auto" }}
                        />
                        <Typography
                            variant="body1"
                            sx={{
                                color: "#090759",
                                fontWeight: "bold",
                                maxWidth: "80%",
                                // marginTop: "10px",
                                textAlign: "right",
                            }}
                        >
                            We help you find pickleball partners while traveling
                            or in your hometown. Stay active and enjoy the game
                            with new friends.
                        </Typography>
                    </Box>

                    <img
                        src={LandingMobile}
                        alt="Welcome"
                        sx={{
                            width: "100%",
                            objectFit: "cover",
                            // marginBottom: "20px",
                        }}
                    />

                    {/* Search by Zip Code */}
                    <Box
                        sx={{
                            background: "#090759",
                            padding: "20px 0",
                        }}
                    >
                        <Typography
                            variant="h6"
                            style={{ color: "#fff", marginBottom: "10px" }}
                        >
                            Find activities near you
                        </Typography>

                        <form onSubmit={formik.handleSubmit}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    // gap: "10px",
                                }}
                            >
                                <TextField
                                    id="zipCode"
                                    name="zipCode"
                                    label="Enter Zip Code"
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                        width: "150px",
                                        bgcolor: "#fff",
                                    }}
                                    {...formik.getFieldProps("zipCode")}
                                    error={
                                        formik.touched.zipCode &&
                                        Boolean(formik.errors.zipCode)
                                    }
                                    helperText={
                                        formik.touched.zipCode &&
                                        formik.errors.zipCode
                                    }
                                />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    sx={{
                                        marginTop: "15px",
                                        width: "80%",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Search
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    );
};

export default Home;
