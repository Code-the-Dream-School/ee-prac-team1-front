import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  IconButton,
  Typography,
} from '@mui/material'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import InfoIcon from '@mui/icons-material/Info'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import SportsTennisIcon from '@mui/icons-material/SportsTennis'
import { useState } from 'react'
import { useNavigate } from 'react-router'
// const players = [
//   { id: 1, name: "Remy Sharp", img: "../../pictures/1.jpg" },
//   { id: 2, name: "Remy Sharp", img: "../../pictures/2.jpg" },
//   { id: 3, name: "Remy Sharp", img: "../../pictures/3.jpg" },
// ];

const ActivityCard = ({ activity }) => {
  const [isAdded, setIsAdded] = useState(false)
  const navigate = useNavigate()

  let players = activity?.players

  let formattedDate = ''
  let formattedTime = ''
  const dateString = activity.date // "2023-12-15T05:00:00.000Z"
  const dateObject = new Date(dateString)

  if (dateObject instanceof Date && !isNaN(dateObject)) {
    formattedDate = `${(dateObject.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${(dateObject.getDate() + 1)
      .toString()
      .padStart(2, '0')}/${dateObject.getFullYear()}`

    // Format the time
    const timeString = activity?.time // "16:30:00"
    const [hours, minutes] = timeString.split(':')
    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0')
    const period = hours < 12 ? 'AM' : 'PM'
    formattedTime = `${formattedHours}:${minutes} ${period}`
  } else {
    console.error('Invalid date object')
  }

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
              <CalendarMonthIcon sx={{ marginLeft: 4 }} />
              <strong>{formattedDate}</strong>
              <AccessTimeIcon sx={{ marginLeft: 2 }} />
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
            <AvatarGroup max={4}>
              {players?.map((playerId) => (
                <Avatar
                  key={playerId} // Use playerId as the key
                  sx={{ width: 32, height: 32 }}
                />
              ))}

              {/*{isAdded ? (
                <Avatar
                  sx={{ width: 32, height: 32 }}
                  alt="Remy Sharp"
                  src="./../pictures/1.jpg"
                />
              ) : (
                <Avatar sx={{ width: 32, height: 32 }}>+1</Avatar>
              )}*/}
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
    </>
  )
}

export default ActivityCard
