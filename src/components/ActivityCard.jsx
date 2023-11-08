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
import { useState } from 'react';
const players = [
  { id: 1, name: 'Remy Sharp', img: '../../pictures/1.jpg' },
  { id: 2, name: 'Remy Sharp', img: '../../pictures/2.jpg' },
  { id: 3, name: 'Remy Sharp', img: '../../pictures/3.jpg' },
];

const ActivityCard = () => {
  const [isAdded, setIsAdded] = useState(false);
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
              <strong>Pickleball </strong>
              <CalendarMonthIcon sx={{ marginLeft: 4 }} />
              <strong>11/5/2023</strong>
              <AccessTimeIcon sx={{ marginLeft: 2 }} />
              <strong>9:00AM</strong>
            </Typography>
          </Box>
          <Box sx={{ marginBottom: 0 }}>
            <Typography
              variant="subtitle2"
              color="text.primary"
              sx={{ marginBottom: 0 }}
            >
              201 W Main St STE 100, Durham, NC 27701
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'raw',
              justifyContent: 'space-between',
            }}
          >
            <AvatarGroup max={4}>
              {players.map(({ id, name, img }) => {
                return (
                  <Avatar
                    key={id}
                    sx={{ width: 32, height: 32 }}
                    alt={name}
                    src={img}
                  />
                );
              })}

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
                  <PersonRemoveIcon fontSize="large" sx={{ color: 'red' }} />
                ) : (
                  <PersonAddAlt1Icon fontSize="large" sx={{ color: 'green' }} />
                )}
              </IconButton>
              <IconButton sx={{ marginTop: -1 }}>
                <InfoIcon fontSize="large" sx={{ color: 'orange' }} />
              </IconButton>
            </span>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default ActivityCard;
