import React from 'react';
import HomeView from './components/HomeView';
import { ApplicationContextProvider, useApplicationContext } from './contexts/ApplicationContext';
import { Grid } from '@mui/material';
import RentalMediaCard from './components/RentalMediaCard';
import SearchAppBar from './components/SearchAppBar';

const App = () => {
  const { rentals } = useApplicationContext();
  return (
    <ApplicationContextProvider>
      <HomeView />
    </ApplicationContextProvider>
  )
}

export default App