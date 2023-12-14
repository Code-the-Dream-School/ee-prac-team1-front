import { Box, Typography, ThemeProvider } from '@mui/material';
import { theme } from '../utils/theme';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'; // Add useState import
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const VerifyCode = () => {
  const { verificationCode, email } = useParams();
  const navigate = useNavigate();
  const [verificationMessage, setVerificationMessage] = useState('');

  useEffect(() => {
    const forgotPassword = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/v1/auth/verifyCode/${verificationCode}`,
          {
            email: email,
          },
        );

        console.log(response);
        const { statusText, data } = response;

        if (statusText !== 'OK') {
          throw new Error('Email sending failed');
        }

        setVerificationMessage(data.message + '\nYou will be redirected to the Home page');
        toast.success('successful');

        // Navigate to '/' after 5 seconds if the response was successful
        setTimeout(() => {
          navigate('/');
        }, 5000);
      } catch (err) {
        setVerificationMessage(
          'There was an error with the verification. Please get in touch with customer service at ctd.ee.team1@gmail.com',
        );
        console.error('Error with verification: ', err);
      }
    };

    // Automatically send the Axios request when the component mounts
    forgotPassword();
  }, [verificationCode, email, navigate]);

  return (
    <>
      <Navbar />
      <ThemeProvider theme={theme}>
        <Box sx={{ backgroundImage: theme.palette.background2.gradient, minHeight: '100vh' }}>
          <Box
            display='flex'
            flexDirection={'column'}
            maxWidth={500}
            alignItems='center'
            justifyContent={'center'}
            margin='auto'
            padding={3}
            borderRadius={5}
          >
            <Typography
              padding={5}
              textAlign='center'
              sx={{
                color: theme.palette.primary.contrastText,
                font: theme.typography.fontFamily,
                fontWeight: theme.typography.titleText.fontWeight,
                fontSize: theme.typography.titleText.fontSize,
              }}
            >
              {verificationMessage}
            </Typography>
          </Box>
        </Box>
      </ThemeProvider>
      <Footer />
    </>
  );
};

export default VerifyCode;
