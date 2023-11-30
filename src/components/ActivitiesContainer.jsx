// ActivitiesContainer.js
import { Grid, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios library
import ActivityCard from './ActivityCard';

const ActivitiesContainer = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/v1/activities'
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

  return (
    <Grid container spacing={1}>
      {loading ? (
        // Display a spinner while loading
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <CircularProgress />
        </Grid>
      ) : (
        // Map through activities and render ActivityCard for each
        activities.map((activity) => (
          <Grid item xs={12} key={activity._id}>
            <ActivityCard activity={activity} />
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default ActivitiesContainer;
