import React from 'react';
import landingImage from '../assets/LandingMobile.png';
import logo from '../assets/logo120.png';
import { Box, ThemeProvider } from '@mui/system';
import { Typography, Button, TextField } from '@mui/material';
import { theme } from '../utils/theme'; // Assuming you have a theme file
import { Link } from 'react-router-dom';
import '../App.css';

const Landing = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: theme.palette.background.main,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%', // Set the width to 100% of the viewport width
          height: '50%', // Set the height to 100% of the viewport height
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: 430, // Set the width of the container
            backgroundColor: 'rgba(25, 29, 230, 0.8)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            mt: 0, // Apply a negative margin to overlap with the image (half of the box height)
          }}
        >
          <img src={logo} alt='Logo' style={{ position: 'absolute', top: 16, left: 16, width: 100, zIndex: 1 }} />
          <img
            src={landingImage}
            alt='Landing Page'
            className='landing-image'
            style={{ width: '100%', maxHeight: '90%', zIndex: 0 }}
          />
          {/* Rest of the box content */}

          <Box
            sx={{
              position: 'absolute',
              top: 190, // Adjust the top position as needed
              left: 150, // Adjust the right position as needed
              color: 'white',
              width: 500,
              textAlign: 'right', // Set the width of the text
            }}
          >
            <Typography
              variant='body1'
              sx={{
                color: theme.palette.secondary.main,
                width: '50%',
                fontSize: 20,
                fontFamily: 'Poppins',
                fontWeight: 'bold',
              }}
            >
              We help you to find the pickleball partner while traveling or in your hometown. Stay active and enjoy the
              game with new friends
            </Typography>
          </Box>

          <Box
            sx={{
              width: '100%',
              minHeight: 244,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              mt: 0, // Apply a negative margin to overlap with the image (half of the box height)
            }}
          >
            <Box
              sx={{
                margin: 5,
                display: 'flex',
                alignItems: 'center',
                width: '90%',
                mt: -5,
                height: 35,
              }}
            >
              <Typography
                variant='h6'
                sx={{
                  color: 'white',
                  width: '50%',
                  fontSize: 16,
                  fontFamily: 'Poppins',
                  fontWeight: 'bold',
                }}
              >
                Find activity near you:
              </Typography>
              <TextField
                label='Enter Zip code'
                variant='outlined'
                inputProps={{
                  inputMode: 'numeric',
                  pattern: '^[0-9]{5}(?:-[0-9]{4})?$',
                }}
                sx={{ width: '50%', maxWidth: '50%', backgroundColor: 'white' }}
              />
            </Box>
            <Button
              variant='contained'
              color='primary'
              sx={{ width: '80%', borderRadius: 20, color: theme.palette.secondary.main }}
            >
              Search
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Landing;
