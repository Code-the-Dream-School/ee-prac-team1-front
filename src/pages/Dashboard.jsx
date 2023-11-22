import { Navbar, ActivitiesContainer } from '../components';
import SearchForm from '../components/SearchForm';

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <SearchForm />
      <ActivitiesContainer />
    </>
  );
};

export default Dashboard;
