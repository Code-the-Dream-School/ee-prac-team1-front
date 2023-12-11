import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  IconButton,
  Typography,
  Grid,
  Paper,
  ThemeProvider,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import InfoIcon from '@mui/icons-material/Info';
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
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import { Navbar } from '../components';
import { theme } from '../utils/theme';
import SearchForm from '../components/SearchForm';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
// const players = [
//   { id: 1, name: "Remy Sharp", img: "../../pictures/1.jpg" },
//   { id: 2, name: "Remy Sharp", img: "../../pictures/2.jpg" },
//   { id: 3, name: "Remy Sharp", img: "../../pictures/3.jpg" },
// ];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const ActivityPage = () => {
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  const navigate = useNavigate();

  const { activityId } = useParams();

  // let players = activity.players;

  // let formattedDate = '';
  // let formattedTime = '';
  // const dateString = activity.date; // "2023-12-15T05:00:00.000Z"
  // const dateObject = new Date(dateString);

  // if (dateObject instanceof Date && !isNaN(dateObject)) {
  //   formattedDate = `${(dateObject.getMonth() + 1)
  //     .toString()
  //     .padStart(2, '0')}/${(dateObject.getDate() + 1)
  //     .toString()
  //     .padStart(2, '0')}/${dateObject.getFullYear()}`;

  //   // Format the time
  //   const timeString = activity.time; // "16:30:00"
  //   const [hours, minutes] = timeString.split(':');
  //   const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
  //   const period = hours < 12 ? 'AM' : 'PM';
  //   formattedTime = `${formattedHours}:${minutes} ${period}`;
  // } else {
  //   console.error('Invalid date object');
  // }
  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/activities/myActivities/${activityId}`
        );
        const data = response.data;

        setActivity(data.activity);
        console.log(data.activity);

        // // Check if data.activities is an array before setting state
        // if (Array.isArray(data.activities)) {
        //   console.log('Fetched data:', data); // Log the fetched data
        //   setActivities(data.activities);
        // } else {
        //   console.error('Invalid data structure. Expected an array.');
        // }

        // Set loading to false when data is fetched
        setLoading(false);
      } catch (error) {
        console.error('Error fetching activities:', error);

        // Set loading to false even if there's an error
        setLoading(false);
      }
    };

    fetchActivity();
  }, []);

  const {
    activityType,
    date,
    experienceLevel,
    fees,
    location,
    contactName,
    contactEmail,
    contactPhoneNum,
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
      {/* <SearchForm sx={{ marginBottom: 1 }} /> */}
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            bgcolor: theme.palette.background.main,
            minHeight: '100vh',
          }}
        >
          <Card
            elevation={4}
            sx={{
              minHeight: { xs: 94, sm: 94, md: 94 },
              maxWidth: { xs: 378, sm: 378, md: 378 },
              borderRadius: '14px',
              display: 'flex',
              margin: 'auto',
              paddingTop: 1,
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
                  <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
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
                    <AccessTimeIcon sx={{ marginRight: 0, marginBottom: -1 }} />
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
                    {`min: ${minPlayers}    `} {`max: ${maxPlayers}`}
                  </Typography>
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
                }}
              >
                <AvatarGroup max={4}>
                  {players?.map((playerId) => (
                    <Avatar
                      key={playerId} // Use playerId as the key
                      sx={{ width: 32, height: 32 }}
                    />
                  ))}

                  {isAdded ? (
                    <Avatar
                      sx={{ width: 32, height: 32 }}
                      alt="Remy Sharp"
                      src="./../pictures/1.jpg"
                    />
                  ) : (
                    <Avatar sx={{ width: 32, height: 32 }}>+1</Avatar>
                  )}
                </AvatarGroup>
                <span>
                  <IconButton
                    sx={{ marginTop: -1 }}
                    onClick={() => setIsAdded(!isAdded)}
                  >
                    {isAdded ? (
                      <PersonRemoveIcon
                        fontSize="large"
                        sx={{ color: 'red' }}
                      />
                    ) : (
                      <PersonAddAlt1Icon
                        fontSize="large"
                        sx={{ color: 'green' }}
                      />
                    )}
                  </IconButton>
                  <IconButton
                    sx={{ marginTop: -1 }}
                    onClick={() => navigate('/')}
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
        </Box>
      </ThemeProvider>
    </>
  );
};

export default ActivityPage;
