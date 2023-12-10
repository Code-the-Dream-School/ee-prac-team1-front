import { useState } from 'react'
import { Navbar, ActivitiesContainer, ActivitiesSorter } from '../components'
import SearchForm from '../components/SearchForm'

const Dashboard = () => {
  const [sortedActivities, setSortedActivities] = useState([])
  return (
    <>
      <Navbar />
      <SearchForm
        setActivitiesByZip={setSortedActivities}
      />
      <ActivitiesSorter
        setSortedActivities={setSortedActivities}
      />
      <ActivitiesContainer sortedActivities={sortedActivities} />
    </>
  )
}

export default Dashboard
