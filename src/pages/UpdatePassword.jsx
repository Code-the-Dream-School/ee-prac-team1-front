import {
  Box,
  Button,
  TextField,
  Typography,
  ThemeProvider,
} from '@mui/material'
import { theme } from '../utils/theme'
import Logo from '../assets/logo70.png'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Link } from 'react-router-dom'

import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import { useState } from 'react'

import { toast, ToastContainer } from 'react-toastify' // Add this import
import 'react-toastify/dist/ReactToastify.css' // Add this import

import axios from 'axios'

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
  oldPassword: yup
    .string('Enter your Current password')
    .required('Current Password is required'),
  newPassword: yup
    .string('Enter your New password')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      'Password must be at least 8 characters long, contain a lowercase letter, an uppercase letter, and a number or special character.',
    )
    .required('New Password is required'),
  confirmPassword: yup
    .string()
    .required('Confirm your new password is required')
    .oneOf(
      [yup.ref('newPassword')],
      'Confirm password must match new password',
    ),
})

const UpdatePassword = () => {
  const navigate = useNavigate()
  const [showoldPassword, setShowoldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const {
    handleSubmit,
    touched,
    errors,
    handleChange,
    handleBlur,
    values,
  } = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },

    validationSchema: validationSchema,
    onSubmit: (values) => {
      const register = async () => {
        try {
          const response = await axios.patch(
            `${process.env.REACT_APP_BASE_URL}/api/v1/users/updateUserPassword`,
            {
              oldPassword: values.oldPassword,
              email: values.email,
            },
          )
          const { data, statusText } = response
          console.log(data)
          if (statusText !== 'Created') {
            throw new Error('Password Change failed')
          }
          navigate('/profileForm')
          const { token } = data
          // Save token to localStorage
          localStorage.setItem('jwtToken', token)
          console.log(token)
        } catch (error) {
          // Show error message
          toast.error('Registration failed. Please try again', {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          })
          console.error('Error registration:', error)
        }
      }

      register()
    },
  })

  const handleoldPasswordVisibility = () => {
    console.log('handleoldPasswordVisibility enter', showoldPassword)
    setShowoldPassword(!showoldPassword)
  }
  const handleNewPasswordVisibility = () => {
    console.log('handleNewPasswordVisibility enter', showNewPassword)
    setShowNewPassword(!showNewPassword)
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          sx={{ bgcolor: theme.palette.background.main, minHeight: '100vh' }}
        >
          <form onSubmit={handleSubmit}>
            <Box
              display="flex"
              flexDirection={'column'}
              maxWidth={500}
              alignItems="center"
              justifyContent={'center'}
              margin="auto"
              marginTop={3}
              padding={3}
              borderRadius={5}
            >
              <img src={Logo} alt="Player Buddy Logo" />

              <Typography
                padding={3}
                textAlign="center"
                sx={{
                  color: theme.palette.primary.contrastText,
                  font: theme.typography.fontFamily,
                  fontWeight: theme.typography.titleText.fontWeight,
                  fontSize: theme.typography.titleText.fontSize,
                }}
              >
                UPDATE PASSWORD
              </Typography>
              {/* current password field */}
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
                placeholder="Enter your current password"
                variant="outlined"
                fullWidth
                id="oldPassword"
                name="oldPassword"
                label="Current Password"
                type={showoldPassword ? 'text' : 'password'}
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleoldPasswordVisibility}
                        aria-label="toggle password"
                        edge="end"
                      >
                        {showoldPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                value={values.oldPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.oldPassword && errors.oldPassword}
              />

              {/* new password field */}
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
                placeholder="Enter your new password"
                variant="outlined"
                fullWidth
                id="newPassword"
                name="newPassword"
                label="New Password"
                type={showNewPassword ? 'text' : 'password'}
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleNewPasswordVisibility}
                        aria-label="toggle password"
                        edge="end"
                      >
                        {showNewPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                value={values.NewPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.newPassword && Boolean(errors.newPassword)}
                helperText={touched.newPassword && errors.newPassword}
              />

              {/* confirm new password field */}
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
                Update
              </Button>
              <Typography
                variant="h7"
                padding={3}
                textAlign="center"
                sx={{ color: theme.palette.primary.contrastText }}
              >
                <Link
                  onClick={() => navigate('/forgotpassword')}
                  style={{ cursor: 'pointer' }}
                >
                  Forgot Password?
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
    </>
  )
}

export default UpdatePassword
