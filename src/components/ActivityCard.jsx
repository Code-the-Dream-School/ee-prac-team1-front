import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  IconButton,
  Typography,
} from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import InfoIcon from '@mui/icons-material/Info';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

const ActivityCard = ({ activity }) => {
  const [singleActivity, setSingleActivity] = useState([]);
  const [isAdded, setIsAdded] = useState(false);
  const navigate = useNavigate();

  const jwtToken = localStorage.getItem('jwtToken');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const isPlayerAdded = activity?.players?.some(
      (player) => player?.playerId === userId
    );
    setSingleActivity(activity);
    setIsAdded(isPlayerAdded);
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

      setSingleActivity(data.activity);
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

      setSingleActivity(data.activity);
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
    const timeString = activity?.time; // "16:30:00"
    const [hours, minutes] = timeString.split(':');
    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
    const period = hours < 12 ? 'AM' : 'PM';
    formattedTime = `${formattedHours}:${minutes} ${period}`;
  } else {
    console.error('Invalid date object');
  }

  const { _id: activityId, maxPlayers, players } = singleActivity;

  return (
    <>
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
          <Box>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginRight: 2,
              }}
            >
              <SportsTennisIcon sx={{ marginRight: 1 }} />
              <strong>{activity.activityType} </strong>
              <CalendarMonthIcon sx={{ marginLeft: 3 }} />
              <strong>{formattedDate}</strong>
              <AccessTimeIcon sx={{ marginLeft: 1 }} />
              <strong>{formattedTime}</strong>
            </Typography>
          </Box>
          <Box sx={{ marginBottom: 0 }}>
            <Typography
              variant="subtitle2"
              color="text.primary"
              sx={{ marginBottom: 0, marginLeft: 2 }}
            >
              {activity?.location?.address}, {activity?.location?.city},{' '}
              {activity?.location?.state} {activity?.location?.zipCode}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'raw',
              justifyContent: 'space-between',
            }}
          >
            <AvatarGroup total={maxPlayers} max={5}>
              {players?.map((player) => (
                <Avatar
                  key={player?.playerId} // Use playerId as the key
                  src={player?.profileImage}
                  {...stringAvatar(`${player?.firstName} ${player?.lastName}`)}
                />
              ))}
            </AvatarGroup>
            <span>
              {isAdded ? (
                <IconButton
                  sx={{ marginTop: -1 }}
                  onClick={removeUserFromActivity}
                >
                  <PersonRemoveIcon fontSize="large" sx={{ color: 'red' }} />
                </IconButton>
              ) : (
                <IconButton sx={{ marginTop: -1 }} onClick={addUserToActivity}>
                  <PersonAddAlt1Icon fontSize="large" sx={{ color: 'green' }} />
                </IconButton>
              )}

              <IconButton
                sx={{ marginTop: -1 }}
                onClick={() => navigate(`/activity/${activity._id}`)}
              >
                <InfoIcon fontSize="large" sx={{ color: 'orange' }} />
              </IconButton>
            </span>
          </Box>
        </Box>
      </Card>
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

export default ActivityCard;
