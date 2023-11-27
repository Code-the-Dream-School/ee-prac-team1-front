import React, { useState } from "react";
import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  IconButton,
  Typography,
} from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import InfoIcon from "@mui/icons-material/Info";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";


const ActivityCard = ({ activity }) => {
  const [isAdded, setIsAdded] = useState(false);


  const formattedDate = new Date(activity.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

   return (
    <Card
      elevation={4}
      sx={{
        minHeight: { xs: 94, sm: 94, md: 94 },
        maxWidth: { xs: 500, sm: 500, md: 500 }, // Adjusted maxWidth for a wider card
        borderRadius: "14px",
        display: "flex",
        margin: "auto",
        paddingTop: 1,
      }}
    >
      <Box
        sx={{
          margin: "auto",
        }}
      >
        <Box>
          <Typography variant="body1" color="text.primary">
          <SportsTennisIcon sx={{ marginRight: 1 }} />
          <strong>{activity.activityType}</strong>
          <CalendarMonthIcon sx={{ marginLeft: 4 }} />
          <strong>{formattedDate}</strong>
          <AccessTimeIcon sx={{ marginLeft: 2 }} />
          <strong>{activity.time}</strong>
        </Typography>
        </Box>
        <Box sx={{ marginBottom: 0 }}>
          <Typography
            variant="subtitle2"
            color="text.primary"
            sx={{ marginBottom: 0 }}
          >
            {`${activity.location.address}, ${activity.location.townOrCity}, ${activity.location.state} ${activity.location.zipCode}`}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "raw",
            justifyContent: "space-between",
          }}
        >
          <AvatarGroup max={4}>
            {activity.players.map(({ id, name, img }) => (
              <Avatar
                key={id}
                sx={{ width: 32, height: 32 }}
                alt={name}
                src={img}
              />
            ))}

            {isAdded ? (
              <Avatar
                sx={{ width: 32, height: 32 }}
                alt={activity.creator.name}
                src={activity.creator.img}
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
                <PersonRemoveIcon fontSize="large" sx={{ color: "red" }} />
              ) : (
                <PersonAddAlt1Icon fontSize="large" sx={{ color: "green" }} />
              )}
            </IconButton>
            <IconButton sx={{ marginTop: -1 }}>
              <InfoIcon fontSize="large" sx={{ color: "orange" }} />
            </IconButton>
          </span>
        </Box>
      </Box>
    </Card>
  );
};

export default ActivityCard;
