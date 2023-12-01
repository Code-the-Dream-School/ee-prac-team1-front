// ActivitiesContainer.js
import { Grid, CircularProgress, Typography, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios library
import ActivityCard from './ActivityCard';

const ActivitiesContainer = ({ activitiesByZip }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/v1/activities`
        );
        const data = response.data;

        // Check if data.activities is an array before setting state
        if (Array.isArray(data.activities)) {
          console.log('Fetched data:', data); // Log the fetched data
          setActivities(data.activities);
        } else {
          console.error('Invalid data structure. Expected an array.');
        }

        // Set loading to false when data is fetched
        setLoading(false);
      } catch (error) {
        console.error('Error fetching activities:', error);

        // Set loading to false even if there's an error
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  useEffect(() => {
    setActivities(activitiesByZip);
  }, [activitiesByZip]);

  return (
    <Grid container spacing={1}>
      {loading ? (
        // Display a spinner while loading
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <CircularProgress />
        </Grid>
      ) : // Map through activities and render ActivityCard for each
      activities?.length > 0 ? (
        activities?.map((activity) => (
          <Grid item xs={12} key={activity._id}>
            <ActivityCard activity={activity} />
          </Grid>
        ))
      ) : (
        <Box sx={{ margin: 'auto' }}>
          <Typography
            variant="h6"
            align="center"
            sx={{ marginTop: 5, marginLeft: 3, marginRight: 3 }}
          >
            We didn't find any activities for your ZIP code
          </Typography>
        </Box>
      )}
    </Grid>
  );
};

export default ActivitiesContainer;
