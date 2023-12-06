import { useState } from 'react';
import { Navbar, ActivitiesContainer } from '../components';
import SearchForm from '../components/SearchForm';

const Dashboard = () => {
  const [activitiesByZip, setActivitiesByZip] = useState([]);

  return (
    <>
      <Navbar />
      <SearchForm setActivitiesByZip={setActivitiesByZip} />
      <ActivitiesContainer activitiesByZip={activitiesByZip} />
    </>
  );
};

export default Dashboard;
