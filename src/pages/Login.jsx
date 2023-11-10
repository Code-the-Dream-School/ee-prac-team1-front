// import React, { useState } from 'react'
import {
  Box,
  Button,
  TextField,
  Typography,
  ThemeProvider,
} from '@mui/material'
import { useState } from 'react'
import { theme } from '../utils/theme'
import Logo from '../assets/logo70.png'
const Login = () => {
  const [isSignup, setisSignup] = useState(false)
  const [inputs, setInputs] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
  })

  //////////////////////////////

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputs)

    console.log(isSignup)
  }
  //handler to reset all the fields in form ON transition from login to signup
  const resetState = () => {
    setisSignup(!isSignup)
    setInputs({ fname: '', lname: '', email: '', password: '' })
  }
  console.log(isSignup)

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box sx={{ bgcolor: 'rgba(29,230,25,0.32)' }}>
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
              {isSignup && (
                <>
                  <Typography variant="h4" padding={3} textAlign="center">
                    <strong>Login</strong>
                  </Typography>
                  <Typography>
                    <strong>Hi there! Nice to see you again.</strong>
                  </Typography>
                </>
              )}
              {!isSignup && (
                <>
                  <Typography variant="h4" padding={3} textAlign="center">
                    <strong>Welcome</strong>
                  </Typography>
                  <Typography>
                    <strong>Lets us help you to find your buddy</strong>
                  </Typography>
                </>
              )}
              {!isSignup && (
                <TextField
                  sx={{ bgcolor: '#fff' }}
                  label="First Name"
                  size="small"
                  onChange={handleChange}
                  value={inputs.fname}
                  name="fname"
                  margin="normal"
                  type={'text'}
                  fullWidth
                  placeholder="Enter your first name"
                  variant="outlined"
                />
              )}
              {!isSignup && (
                <TextField
                  sx={{ bgcolor: '#fff' }}
                  label="Last Name"
                  size="small"
                  onChange={handleChange}
                  variant="outlined"
                  bgcolor="#ffff"
                  value={inputs.lname}
                  name="lname"
                  margin="normal"
                  type={'text'}
                  fullWidth
                  placeholder="Enter your last name"
                />
              )}
              <TextField
                sx={{ bgcolor: '#fff' }}
                label="E-mail"
                size="small"
                fullWidth
                onChange={handleChange}
                value={inputs.email}
                name="email"
                margin="normal"
                type={'text'}
                placeholder="Enter your e-mail"
              />
              <TextField
                sx={{ bgcolor: '#fff' }}
                label="Password"
                size="small"
                fullWidth
                onChange={handleChange}
                value={inputs.password}
                name="password"
                margin="normal"
                type={'password'}
                placeholder="Enter your password"
              />

              <Button
                type="submit"
                onClick={resetState}
                fullWidth
                sx={{ marginTop: 3, borderRadius: 3 }}
                variant="contained"
              >
                {!isSignup ? 'Sign in' : 'Login'}
              </Button>
              <Button
                onClick={resetState}
                sx={{ marginTop: 3, borderRadius: 3 }}
                fullWidth
              >
                {!isSignup
                  ? 'Already have an account? Log in'
                  : "Don't have an account? Sign in"}
              </Button>
            </Box>
          </form>
        </Box>
      </ThemeProvider>
    </>
  )
}

export default Login
