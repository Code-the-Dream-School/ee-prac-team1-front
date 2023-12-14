import React from 'react';
import landingImage from '../assets/LandingMobile.png';
import { Box, ThemeProvider } from '@mui/system';
import { Typography, Button, TextField } from '@mui/material';
import { theme } from '../utils/theme'; // Assuming you have a theme file
import { Link } from 'react-router-dom';
import '../App.css';

const Landing = () => {
  return (
    <ThemeProvider theme={theme}>
      {/* Assuming you want to use Box to structure your layout */}
      <Box
        sx={{
          bgcolor: theme.palette.background.main,
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        {/* Image takes up half of the screen */}
        <img src={landingImage} alt='Landing Page' className='landing-image' />

        {/* Typography centered in the other half */}
        <Box sx={{ width: '50%', textAlign: 'center', zIndex: 1 }}>
          <Typography variant='h1'>Player Buddy</Typography>
          <Typography variant='h4'>Find activties > Join > Have fun!</Typography>
          <Button
            variant='contained'
            color='primary'
            component={Link} // Use Link from react-router-dom
            to='/dashboard' // Specify the target route
            sx={{ borderRadius: 20, margin: 2 }}
          >
            Explore
          </Button>
          <Button
            variant='contained'
            color='primary'
            component={Link} // Use Link from react-router-dom
            to='/register' // Specify the target route
            sx={{ borderRadius: 20, margin: 2 }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Landing;
