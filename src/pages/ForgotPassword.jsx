import "react-toastify/dist/ReactToastify.css"; // Add this import

import * as yup from "yup";

import {
    Box,
    Button,
    TextField,
    ThemeProvider,
    Typography,
} from "@mui/material";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";
import { theme } from "../utils/theme";
import { toast } from "react-toastify"; // Add this import
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

// import { ToastContainer } from "react-toastify";

// import { userDataContext } from '../context/userContext'

// import Logo from '../assets/logo70.png'

const validationSchema = yup.object({
    email: yup
        .string("Enter your email")
        .email("Enter a valid email")
        .required("Email is required"),
});

const ForgotPassword = () => {
    const navigate = useNavigate();
    const { handleSubmit, touched, errors, handleChange, handleBlur, values } =
        useFormik({
            initialValues: {
                email: "fkreminsky@gmail.com",
            },

            validationSchema: validationSchema,
            onSubmit: (values) => {
                const forgotPassword = async () => {
                    try {
                        const response = await axios.post(
                            `${process.env.REACT_APP_BASE_URL}/api/v1/auth/forgotPassword`,
                            {
                                email: values.email,
                            }
                        );

                        console.log(response);
                        const { statusText } = response;

                        if (statusText !== "OK") {
                            throw new Error("Email sending failed");
                        }

                        toast.success("successful");

                        navigate("/");
                    } catch (err) {
                        const { code } = err;
                        if (code === "ERR_NETWORK") {
                            // Show error message
                            toast.error(
                                "Operation failed. Please check your network connection",
                                {
                                    position: "top-center",
                                    autoClose: 3000,
                                    hideProgressBar: true,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                }
                            );
                            return;
                        }
                        const { response } = err;
                        const { data } = response;
                        const { error } = data;
                        // Show error message//
                        toast.error(
                            error || err.message || "Please resent an email",
                            {
                                position: "top-center",
                                autoClose: 3000,
                                hideProgressBar: true,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                            }
                        );
                        console.error("Error sending email", error);
                    }
                };
                forgotPassword();
            },
        });

    return (
        <>
            <Navbar />
            <ThemeProvider theme={theme}>
                <Box
                    sx={{
                        backgroundImage: theme.palette.background2.gradient,
                        minHeight: "100vh",
                    }}
                >
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="flex"
                            flexDirection={"column"}
                            maxWidth={500}
                            alignItems="center"
                            justifyContent={"center"}
                            margin="auto"
                            padding={3}
                            borderRadius={5}
                        >
                            <Typography
                                padding={5}
                                textAlign="center"
                                sx={{
                                    color: theme.palette.primary.contrastText,
                                    font: theme.typography.fontFamily,
                                    fontWeight:
                                        theme.typography.titleText.fontWeight,
                                    fontSize:
                                        theme.typography.titleText.fontSize,
                                }}
                            >
                                FORGOT PASSWORD
                            </Typography>
                            <TextField
                                sx={{
                                    bgcolor: "#fff",
                                    "& .MuiInputLabel-root.Mui-focused":
                                        theme.overrides.MuiInputLabel.root[
                                            "&.Mui-focused"
                                        ],
                                    "& .MuiOutlinedInput-root":
                                        theme.overrides.MuiOutlinedInput.root,
                                }}
                                size="small"
                                margin="normal"
                                type={"text"}
                                placeholder="Enter your e-mail"
                                variant="outlined"
                                fullWidth
                                id="email"
                                name="email"
                                label="Email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.email && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                            />
                            <Button
                                color="primary"
                                variant="contained"
                                fullWidth
                                type="submit"
                                sx={{
                                    ...theme.commonButtonStyles,
                                    marginLeft: 2,
                                    marginRight: 2,
                                }}
                            >
                                Send Reset Link
                            </Button>
                        </Box>
                    </form>
                </Box>
            </ThemeProvider>
            <Footer />
        </>
    );
};

export default ForgotPassword;
