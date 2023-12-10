import axios from 'axios'

import { Button, ThemeProvider, Box } from '@mui/material'
// import { toast, ToastContainer } from 'react-toastify'
import { theme } from '../utils/theme'

const ActivitiesSorter = ({
  setActivitiesJoined,
  setActivitiesCreated,
  setSortedBy,
}) => {
  const handleSubmitJoined = () => {
    setSortedBy('joined')
    const token = localStorage.getItem('jwtToken')
    const userId = localStorage.getItem('userId')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const fetchActivitiesJoined = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/v1/activities/createdActivities/:${userId}`,
          config,
        )
        const { data } = response
        console.log(data)
        setActivitiesJoined(data.upcomingActivities)
      } catch (error) {}
    }

    fetchActivitiesJoined()
  }

  const handleSubmitCreated = () => {
    setSortedBy('created')
    const token = localStorage.getItem('jwtToken')
    const userId = localStorage.getItem('userId')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const fetchActivitiesCreated = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/v1/activities/createdActivities/:${userId}`,
          config,
        )
        const { data } = response
        console.log(data)
        setActivitiesCreated(data.upcomingActivities)
      } catch (error) {}
    }

    fetchActivitiesCreated()
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          display="flex"
          flexDirection={'row'}
          maxWidth={500}
          alignItems={'start'}
          justifyContent={'center'}
          margin={'auto'}
          gap={1}
          padding={1}
        >
          <Button
            variant="contained"
            type="submit"
            color="primary"
            sx={{
              ...theme.commonButtonStyles,
              width: 120,
            }}
            //onClick={handleSubmitAll}
            spacing={10}
          >
            All
          </Button>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            sx={{
              ...theme.commonButtonStyles,
              width: 120,
            }}
            onClick={handleSubmitJoined}
            spacing={10}
          >
            Joined
          </Button>

          {/* Search  Button */}
          <Button
            variant="contained"
            type="submit"
            color="primary"
            sx={{
              ...theme.commonButtonStyles,
              width: 120,
            }}
            onClick={handleSubmitCreated}
            spacing={10}
          >
            Created
          </Button>
        </Box>
      </ThemeProvider>
      {/* <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> */}
    </>
  )
}

export default ActivitiesSorter
