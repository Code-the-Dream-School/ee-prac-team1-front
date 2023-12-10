import { useState } from 'react'
import { Navbar, ActivitiesContainer, ActivitiesSorter } from '../components'
import SearchForm from '../components/SearchForm'

const Dashboard = () => {
  const [activitiesByZip, setActivitiesByZip] = useState([])
  const [activitiesCreated, setActivitiesCreated] = useState([])
  const [activitiesJoined, setActivitiesJoined] = useState([])
  const [sortedBy, setSortedBy] = useState([])
  let sortedActivities = []
  if (sortedBy === 'zip') {
    sortedActivities = activitiesByZip
  }
  if (sortedBy === 'created') {
    sortedActivities = activitiesCreated
  }
  if (sortedBy === 'joined') {
    sortedActivities = activitiesJoined
  }
  if (sortedBy === 'all') {
    sortedActivities = []
  }
  return (
    <>
      <Navbar />
      <SearchForm
        setActivitiesByZip={setActivitiesByZip}
        sortedBy={setSortedBy}
      />
      <ActivitiesSorter
        setActivitiesCreated={setActivitiesCreated}
        setActivitiesJoined={setActivitiesJoined}
        sortedBy={setSortedBy}
      />
      <ActivitiesContainer sortedActivities={sortedActivities} />
    </>
  )
}

export default Dashboard
