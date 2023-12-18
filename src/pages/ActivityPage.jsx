import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  CircularProgress,
  IconButton,
  Typography,
  Grid,
  ThemeProvider,
  Divider,
} from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import PeopleIcon from '@mui/icons-material/People';
import StarIcon from '@mui/icons-material/Star';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PermDeviceInformationIcon from '@mui/icons-material/PermDeviceInformation';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PersonIcon from '@mui/icons-material/Person';
import EventNoteIcon from '@mui/icons-material/EventNote';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import { Footer, Navbar } from '../components';
import { theme } from '../utils/theme';
import SearchForm from '../components/SearchForm';
import { toast, ToastContainer } from 'react-toastify';

const ActivityPage = () => {
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  const navigate = useNavigate();

  const { activityId } = useParams();
  const jwtToken = localStorage.getItem('jwtToken');
  const userId = localStorage.getItem('userId');
  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/v1/activities/myActivities/${activityId}`
        );
        const data = response.data;

        setActivity(data.activity);
        setLoading(false);

        const isPlayerAdded = await data?.activity?.players?.some(
          (player) => player.playerId === userId
        );
        setIsAdded(isPlayerAdded);
      } catch (error) {
        console.error('Error fetching activities:', error);

        // Set loading to false even if there's an error
        setLoading(false);
      }
    };

    fetchActivity();
  }, []);

  const addUserToActivity = async () => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/v1/activities/addMe/${activityId}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      const data = response.data;

      setActivity(data.activity);
      setIsAdded(true);
    } catch (error) {
      toast.error('Please login or register to join the activity', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const removeUserFromActivity = async () => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/v1/activities/removeMe/${activityId}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      const data = response.data;

      setActivity(data.activity);
      setIsAdded(false);
    } catch (error) {
      toast.error('Please login or register to join the activity', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  const {
    activityType,
    //    date,
    experienceLevel,
    fees,
    location,
    contactName,
    contactEmail,
    contactPhoneNum,
    venue,
    minPlayers,
    maxPlayers,
    players,
    notes,
  } = activity;

  let formattedDate = '';
  let formattedTime = '';
  const dateString = activity.date; // "2023-12-15T05:00:00.000Z"
  const dateObject = new Date(dateString);

  if (dateObject instanceof Date && !isNaN(dateObject)) {
    formattedDate = `${(dateObject.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${(dateObject.getDate() + 1)
      .toString()
      .padStart(2, '0')}/${dateObject.getFullYear()}`;

    // Format the time
    const timeString = activity.time; // "16:30:00"
    const [hours, minutes] = timeString.split(':');
    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
    const period = hours < 12 ? 'AM' : 'PM';
    formattedTime = `${formattedHours}:${minutes} ${period}`;
  } else {
    // console.error('Invalid date object');
  }

  return (
    <>
      <Navbar />
      <SearchForm sx={{ marginBottom: 1 }} />
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            backgroundImage: theme.palette.background2.gradient,
            minHeight: '100vh',
          }}
        >
          {loading ? (
            // Display a spinner while loading
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <CircularProgress />
            </Grid>
          ) : (
            <Card
              elevation={4}
              sx={{
                minHeight: { xs: 94, sm: 94, md: 94 },
                maxWidth: { xs: 378, sm: 378, md: 378 },
                borderRadius: '14px',
                display: 'flex',
                margin: 'auto',
                paddingTop: 1,
                paddingLeft: 1,
                paddingRight: 1,
              }}
            >
              <Box
                sx={{
                  margin: 'auto',
                }}
              >
                <Grid container sx={{ marginTop: 1 }}>
                  <Grid item xs>
                    <Typography variant="h6">
                      <SportsTennisIcon
                        sx={{ marginRight: 1, marginBottom: -1 }}
                      />
                      Activity
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography
                      variant="h6"
                      sx={{ textTransform: 'capitalize' }}
                    >
                      <strong>{activityType}</strong>
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container sx={{ marginTop: 1 }}>
                  <Grid item xs>
                    <Typography variant="body1">
                      <CalendarMonthIcon
                        sx={{ marginRight: 1, marginBottom: -1 }}
                      />
                      <strong>{formattedDate}</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body1">
                      <AccessTimeIcon
                        sx={{ marginRight: 0, marginBottom: -1 }}
                      />
                      <strong> {formattedTime}</strong>
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container sx={{ marginTop: 1, marginBottom: 2 }}>
                  <LocationOnIcon sx={{ marginRight: 1 }} />
                  <Grid item xs>
                    <Typography variant="body1">
                      {' '}
                      {location?.address}, {location?.city}, {location?.state}{' '}
                      {location?.zipCode}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider />
                <Grid container sx={{ marginTop: 2 }}>
                  <StarIcon sx={{ marginRight: 1 }} />
                  <Grid item xs>
                    <Typography variant="h6"> Experience</Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="h6"> {experienceLevel}</Typography>
                  </Grid>
                </Grid>
                <Grid container sx={{ marginTop: 1 }}>
                  <PeopleIcon sx={{ marginRight: 1 }} />
                  <Grid item xs>
                    <Typography variant="h6">Enrollment</Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="h6">
                      {`min: ${minPlayers}`} {`max: ${maxPlayers}`}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container sx={{ marginTop: 1 }}>
                  <WbSunnyIcon sx={{ marginRight: 1 }} />
                  <Grid item xs>
                    <Typography variant="h6">Venue</Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="h6">{venue}</Typography>
                  </Grid>
                </Grid>
                <Grid container sx={{ marginTop: 1, marginBottom: 2 }}>
                  <AttachMoneyIcon sx={{ marginRight: 1 }} />

                  <Grid item xs>
                    <Typography variant="h6"> Activity fee:</Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="h6"> {`$ ${fees}`}</Typography>
                  </Grid>
                </Grid>
                <Divider />
                <Grid container sx={{ marginTop: 2 }}>
                  <PermDeviceInformationIcon sx={{ marginRight: 1 }} />
                  <Grid item xs>
                    <Typography variant="h6"> Contact Information</Typography>
                  </Grid>
                </Grid>
                <Grid container sx={{ marginTop: 1 }}>
                  <PersonIcon sx={{ marginRight: 1 }} />
                  <Grid item xs>
                    <Typography variant="body1"> {contactName}</Typography>
                  </Grid>
                </Grid>
                <Grid container sx={{ marginTop: 1 }}>
                  <AlternateEmailIcon sx={{ marginRight: 1 }} />
                  <Grid item xs>
                    <Typography variant="body1"> {contactEmail}</Typography>
                  </Grid>
                </Grid>
                <Grid container sx={{ marginTop: 1, marginBottom: 2 }}>
                  <LocalPhoneIcon sx={{ marginRight: 1 }} />
                  <Grid item xs>
                    <Typography variant="body1"> {contactPhoneNum}</Typography>
                  </Grid>
                </Grid>
                <Divider />
                <Grid container sx={{ marginTop: 2 }}>
                  <EventNoteIcon sx={{ marginRight: 1 }} />
                  <Grid item xs>
                    <Typography variant="h6"> Notes</Typography>
                  </Grid>
                </Grid>
                <Grid container sx={{ marginTop: 1, marginBottom: 2 }}>
                  <FormatListBulletedIcon sx={{ marginRight: 1 }} />
                  <Grid item xs>
                    <Typography variant="body1"> {notes}</Typography>
                  </Grid>
                </Grid>

                <Divider />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'raw',
                    justifyContent: 'space-between',
                    marginTop: 2,
                    marginBottom: 2,
                  }}
                >
                  <AvatarGroup
                    total={
                      players?.length < 6
                        ? maxPlayers
                        : maxPlayers - players?.length + 6
                    }
                    max={7}
                  >
                    {players?.map((player) => (
                      <Avatar
                        key={player.playerId} // Use playerId as the key
                        src={player?.profileImage}
                        {...stringAvatar(
                          `${player?.firstName} ${player?.lastName}`
                        )}
                      />
                    ))}
                  </AvatarGroup>
                  <span>
                    {isAdded ? (
                      <IconButton
                        sx={{ marginTop: -1 }}
                        onClick={removeUserFromActivity}
                      >
                        <PersonRemoveIcon
                          fontSize="large"
                          sx={{ color: 'red' }}
                        />
                      </IconButton>
                    ) : players?.length < maxPlayers ? (
                      <IconButton
                        sx={{ marginTop: -1 }}
                        onClick={addUserToActivity}
                      >
                        <PersonAddAlt1Icon
                          fontSize="large"
                          sx={{ color: 'green' }}
                        />
                      </IconButton>
                    ) : (
                      ''
                    )}

                    <IconButton
                      sx={{ marginTop: -1 }}
                      onClick={() => navigate('/dashboard')}
                    >
                      <ArrowCircleLeftIcon
                        fontSize="large"
                        sx={{ color: 'orange' }}
                      />
                    </IconButton>
                  </span>
                </Box>
              </Box>
            </Card>
          )}
        </Box>
      </ThemeProvider>
      <Footer />
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
  );
};

export default ActivityPage;