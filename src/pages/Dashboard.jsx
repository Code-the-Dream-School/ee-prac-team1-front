import { Typography } from '@mui/material';
import { Navbar, GameCard } from '../components';

const Dashboard = () => {
  return (
    <>
      <Typography variant="h2">Dashboard</Typography>
      <Navbar />
      <GameCard />
    </>
  );
};

export default Dashboard;
