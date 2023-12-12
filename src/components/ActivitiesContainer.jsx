// ActivitiesContainer.js
import {
  Grid,
  CircularProgress,
  Typography,
  Box,
  Pagination,
  ThemeProvider,
} from '@mui/material'
import { theme } from '../utils/theme'
import { useEffect, useState } from 'react'
import axios from 'axios' // Import Axios library
import ActivityCard from './ActivityCard'

const ActivitiesContainer = ({ sortedActivities }) => {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  
  const [data, setData] = useState([]);

  //for all activities , even when the user is not logged in
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/v1/activities`,
        )
        const data = response.data
        // Check if data.activities is an array before setting state
        if (Array.isArray(data.activities)) {
          console.log('Fetched data:', data) // Log the fetched data
          setActivities(data.activities)
          setData(data)
        } else {
          console.error('Invalid data structure. Expected an array.')
        }

        // Set loading to false when data is fetched
        setLoading(false)
      } catch (error) {
        console.error('Error fetching activities:', error)

        // Set loading to false even if there's an error
        setLoading(false)
      }
    }

    fetchActivities()
  }, [])

  
        const message = data.message
        console.log("message:",message)

  const pageSize = 4
  const [page, setPage] = useState(1)
  const handleChange = (event, value) => {
    setPage(value)
  }

  useEffect(() => {
    setActivities(sortedActivities)
  }, [sortedActivities])

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            backgroundImage: theme.palette.background2.gradient,
            minHeight: '100vh',
          }}
        >
          <Grid container spacing={1}>
            {loading ? (
              // Display a spinner while loading
              <Grid item xs={12} style={{ textAlign: 'center' }}>
                <CircularProgress />
              </Grid>
            ) : // Map through activities and render ActivityCard for each
            activities?.length > 0 ? (
              <>
              {/* <Box sx={{ margin: 'auto' }}>
                <Grid item xs>
                <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
                    <strong>{message}</strong>
                  </Typography>
                  </Grid>
              </Box> */}
                {activities
                  .slice((page - 1) * pageSize, page * pageSize)
                  .map((activity) => (
                    <Grid item xs={12} key={activity._id}>
                      <ActivityCard activity={activity} />
                    </Grid>
                  ))}

                <Grid
                  sx={{
                    paddingTop: 3,
                    margin: 'auto',
                    width: 'fit-content',
                    alignItems: 'center',
                  }}
                >
                  <Pagination
                    variant="outlined"
                    shape="rounded"
                    color="secondary"
                    count={Math.ceil(activities.length / pageSize)}
                    page={page}
                    onChange={handleChange}
                  />
                </Grid>
              </>
            ) : (
              <Box sx={{ margin: 'auto' }}>
                <Typography
                  variant="h6"
                  align="center"
                  sx={{ marginTop: 5, marginLeft: 3, marginRight: 3 }}
                >
                  {/* more general message */}
                  No activities found. Please try again.
                </Typography>
              </Box>
            )}
          </Grid>
        </Box>
      </ThemeProvider>
    </>
  )
}

export default ActivitiesContainer
