import {
  Box,
  Button,
  TextField,
  Typography,
  ThemeProvider,
} from '@mui/material'
import { theme } from '../utils/theme'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Link } from 'react-router-dom'

import Footer from '../components/Footer'

import Navbar from '../components/Navbar'

import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import { useState, useContext } from 'react'

import { toast, ToastContainer } from 'react-toastify' // Add this import
import 'react-toastify/dist/ReactToastify.css' // Add this import

import axios from 'axios'
import { userDataContext } from '../context/userContext'

const validationSchema = yup.object({
  firstName: yup
    .string('Enter first name')
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters long')
    .max(50, 'First name cannot be more than 50 characters long'),
  lastName: yup
    .string('Enter last name')
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters long')
    .max(50, 'Last name cannot be more than 50 characters long'),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      'Password must be at least 8 characters long, contain a lowercase letter, an uppercase letter, and a number or special character.',
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password')], 'Confirm password must match password'),
})

const Register = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const {setUserData } = useContext(userDataContext)

  const {
    handleSubmit,
    touched,
    errors,
    handleChange,
    handleBlur,
    values,
  } = useFormik({
    initialValues: {
      lastName: '',
      firstName: '',
      email: '',
      password: '',
    },

    validationSchema: validationSchema,
    onSubmit: (values) => {
      const register = async () => {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/v1/auth/register`,
            {
              firstName: values.firstName,
              lastName: values.lastName,
              password: values.password,
              email: values.email,
            },
          )
          const { data, statusText, status} = response

          if (statusText !== 'Created'||status!==200) {
            throw new Error('Register failed')
          }

          const { token, user } = data
          const { userId } = user
          setUserData({ ...data })
          // Save token to localStorage
          localStorage.setItem('jwtToken', token)
          localStorage.setItem('userId', userId)
        } catch (error) {
          // Show error message
          toast.error(
            `Registration failed: ${error.response?.data?.msg}`,
            {
              position: 'top-center',
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            },
          )
          console.error('Error registration:', error)
          // navigate('/')
          return
        }
        navigate('/profileForm')
      }
      register()
    },
  })

  const handlePasswordVisibility = () => {
    console.log('handlePasswordVisibility enter', showPassword)
    setShowPassword(!showPassword)
  }

  return (
    <>
      <Navbar />
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            backgroundImage: theme.palette.background2.gradient,
            minHeight: '100vh',
          }}
        >
          <form onSubmit={handleSubmit}>
            <Box
              display="flex"
              flexDirection={'column'}
              maxWidth={500}
              alignItems="center"
              justifyContent={'center'}
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
                  fontWeight: theme.typography.titleText.fontWeight,
                  fontSize: theme.typography.titleText.fontSize,
                }}
              >
                CREATE ACCOUNT
              </Typography>
              <TextField
                sx={{
                  bgcolor: '#fff',
                  '& .MuiInputLabel-root.Mui-focused':
                    theme.overrides.MuiInputLabel.root['&.Mui-focused'],
                  '& .MuiOutlinedInput-root':
                    theme.overrides.MuiOutlinedInput.root,
                }}
                size="small"
                margin="normal"
                type={'text'}
                placeholder="Enter your first name"
                variant="outlined"
                fullWidth
                id="FirstName"
                name="firstName"
                label="First Name"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.firstName && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
              />
              <TextField
                sx={{
                  bgcolor: '#fff',
                  '& .MuiInputLabel-root.Mui-focused':
                    theme.overrides.MuiInputLabel.root['&.Mui-focused'],
                  '& .MuiOutlinedInput-root':
                    theme.overrides.MuiOutlinedInput.root,
                }}
                size="small"
                margin="normal"
                type={'text'}
                placeholder="Enter your last name"
                variant="outlined"
                fullWidth
                id="LastName"
                name="lastName"
                label="Last Name"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.lastName && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
              />
              <TextField
                sx={{
                  bgcolor: '#fff',
                  '& .MuiInputLabel-root.Mui-focused':
                    theme.overrides.MuiInputLabel.root['&.Mui-focused'],
                  '& .MuiOutlinedInput-root':
                    theme.overrides.MuiOutlinedInput.root,
                }}
                size="small"
                margin="normal"
                type={'text'}
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
              <TextField
                sx={{
                  bgcolor: '#fff',
                  '& .MuiInputLabel-root.Mui-focused':
                    theme.overrides.MuiInputLabel.root['&.Mui-focused'],
                  '& .MuiOutlinedInput-root':
                    theme.overrides.MuiOutlinedInput.root,
                }}
                size="small"
                margin="normal"
                placeholder="Enter your password"
                variant="outlined"
                fullWidth
                id="password"
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handlePasswordVisibility}
                        aria-label="toggle password"
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              <TextField
                sx={{
                  bgcolor: '#fff',
                  '& .MuiInputLabel-root.Mui-focused':
                    theme.overrides.MuiInputLabel.root['&.Mui-focused'],
                  '& .MuiOutlinedInput-root':
                    theme.overrides.MuiOutlinedInput.root,
                }}
                size="small"
                margin="normal"
                placeholder="Enter your password to confirm"
                variant="outlined"
                fullWidth
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.confirmPassword && Boolean(errors.confirmPassword)
                }
                helperText={touched.confirmPassword && errors.confirmPassword}
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
                Continue
              </Button>
              <Typography
                variant="h7"
                padding={3}
                textAlign="center"
                sx={{ color: theme.palette.primary.contrastText }}
              >
                Already have an account?
                <Link
                  onClick={() => navigate('/login')}
                  style={{ cursor: 'pointer' }}
                >
                  Login
                </Link>
              </Typography>
            </Box>
          </form>
        </Box>
      </ThemeProvider>
      {/* Add the ToastContainer */}
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
  )
}

export default Register
