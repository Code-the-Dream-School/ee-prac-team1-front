import { Grid } from '@mui/material';

import ActivityCard from './ActivityCard';

const activities = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

const ActivitiesContainer = () => {
  return (
    <Grid container spacing={1}>
      {activities.map((activity) => {
        return (
          <Grid item xs={12} key={activity.id}>
            <ActivityCard />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ActivitiesContainer;
