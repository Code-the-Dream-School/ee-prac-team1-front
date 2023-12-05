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

import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import { useState } from 'react'
import { Navbar } from '../components'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import axios from 'axios'

const validationSchema = yup.object({
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
      const token = localStorage.getItem('jwtToken')
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const updatePassword = async () => {
        try {
          const response = await axios.patch(
            `${process.env.REACT_APP_BASE_URL}/api/v1/users/updateUserPassword`,
            {
              oldPassword: values.oldPassword,
              newPassword: values.newPassword,
            },
            config,
          )
          console.log(response)
          const { data, statusText } = response
          if (statusText !== 'OK') {
            throw new Error('Password Change failed')
          }
          toast.success(`${data.msg}`, {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          })
        } catch (error) {
          toast.error('Update password failed. Please try again', {
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

      updatePassword()

      navigate('/profileForm')
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
               <Navbar />

              <Typography
                padding={10}
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
