import { useState } from 'react'
import { Navbar, ActivitiesContainer, ActivitiesSorter } from '../components'
import SearchForm from '../components/SearchForm'

const Dashboard = () => {
  const [activitiesByZip, setActivitiesByZip] = useState([])
  const [activitiesByUser, setActivitiesByUser] = useState([])
  
  return (
    <>
      <Navbar />

      <SearchForm setActivitiesByZip={setActivitiesByZip} />
      <ActivitiesSorter setActivitiesByUser={setActivitiesByUser} />
      <ActivitiesContainer activitiesByZip={activitiesByZip} />
    </>
  )
}

export default Dashboard
