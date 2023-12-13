import { useState } from 'react'
import { Navbar, ActivitiesContainer, ActivitiesSorter, Footer } from '../components'
import SearchForm from '../components/SearchForm'

import { React, useContext } from "react";
import { userDataContext } from '../context/userContext'

const Dashboard = () => {
  const [sortedActivities, setSortedActivities] = useState([])
    //destructure isLoggedIn from global 
    const { userData } = useContext(userDataContext);
    const { isLoggedIn } = userData;
  return (
    <>
      <Navbar />
      <SearchForm
        setActivitiesByZip={setSortedActivities}
      />
      {isLoggedIn ? (
      <>
      <ActivitiesSorter
        setSortedActivities={setSortedActivities}
      />
      <ActivitiesContainer sortedActivities={sortedActivities} />
      </>
      ) : (
          <>
      <ActivitiesContainer sortedActivities={sortedActivities} />

          </>
        )}
      <Footer />
    </>
  )
}

export default Dashboard
