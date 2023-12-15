import { Box, Button, ThemeProvider } from '@mui/material'

import axios from 'axios'

import { theme } from '../utils/theme'
import { useContext } from 'react'
// import { toast, ToastContainer } from 'react-toastify'


import { useNavigate } from 'react-router-dom'
import { userDataContext } from '../context/userContext'

const ActivitiesSorter = ({ setSortedActivities }) => {
  const navigate = useNavigate()
  const { setUserData } = useContext(userDataContext)
  //JOINED
  const handleSubmitJoined = () => {
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
          `${process.env.REACT_APP_BASE_URL}/api/v1/activities/joinedActivities/${userId}`,
          config,
        )
        const { data } = response
        console.log(data)

        setSortedActivities(data.upcomingActivities)
      } catch (error) {
        const { response } = error
        const { status } = response

        if (status === 401) {
          localStorage.removeItem('jwtToken')
          localStorage.removeItem('userId')
          setUserData({ isLoggedIn: false })
          navigate('/')
        }
      }
    }

    fetchActivitiesJoined()
  }

  // CREATED
  const handleSubmitCreated = () => {
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
          `${process.env.REACT_APP_BASE_URL}/api/v1/activities/createdActivities/${userId}`,
          config,
        )
        const { data } = response
        console.log(data)
        setSortedActivities(data.upcomingActivities)
      } catch (error) {
        const { response } = error
        const { status } = response

        if (status === 401) {
          localStorage.removeItem('jwtToken')
          localStorage.removeItem('userId')
          setUserData({ isLoggedIn: false })
          navigate('/')
        }
      }
    }
    fetchActivitiesCreated()
  }

  //ALL
  const handleSubmitAll = () => {
    const token = localStorage.getItem('jwtToken')
    const userId = localStorage.getItem('userId')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const fetchActivitiesAllOther = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/v1/activities/allOtherActivities/${userId}`,
          config,
        )
        const { data } = response
        const { upcomingActivities } = data
        //const { todayActivities } = data
        console.log(data)

        setSortedActivities(upcomingActivities)
        //setSortedActivities(todayActivities)
      } catch (error) {
        const { response } = error
        const { status } = response

        if (status === 401) {
          localStorage.removeItem('jwtToken')
          localStorage.removeItem('userId')
          setUserData({ isLoggedIn: false })
          navigate('/')
        }
      }
    }
    fetchActivitiesAllOther()
  }

  return (
      <>
          <ThemeProvider theme={theme}>
              <Box sx={{ bgcolor: "#caf2c9" }}>
                  <Box
                      display="flex"
                      flexDirection={"row"}
                      maxWidth={500}
                      alignItems={"start"}
                      justifyContent={"center"}
                      margin={"auto"}
                      gap={1}
                      padding={2}
                  >
                      <Button
                          variant="text"
                          type="submit"
                          color="primary"
                          sx={{
                              ...theme.sortingButtons,
                              width: 120,
                          }}
                          onClick={handleSubmitAll}
                          spacing={10}
                      >
                          All
                      </Button>
                      <Button
                          variant="text"
                          type="submit"
                          color="primary"
                          sx={{
                              ...theme.sortingButtons,
                              width: 120,
                          }}
                          onClick={handleSubmitJoined}
                          spacing={10}
                      >
                          Joined
                      </Button>

                      {/* Search  Button */}
                      <Button
                          variant="text"
                          type="submit"
                          color="primary"
                          sx={{
                              ...theme.sortingButtons,
                              width: 120,
                          }}
                          onClick={handleSubmitCreated}
                          spacing={10}
                      >
                          Created
                      </Button>
                  </Box>
              </Box>
          </ThemeProvider>
      </>
  );
}

export default ActivitiesSorter
