import { Grid } from '@mui/material';
import React from 'react';
import { useApplicationContext } from '../contexts/ApplicationContext';
import RentalMediaCard from './RentalMediaCard';
import SearchAppBar from './SearchAppBar';

const HomeView = () => {
  // Get the Rental Cars from JSON file when the page loads
  const { rentals } = useApplicationContext();

  return (
    <div>
      {/* The app bar */}
      <SearchAppBar />
      {/* The main content (display of rental cars) */}
      <Grid container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        {rentals.map(rental => (
          <Grid key={rental.id} item xs={3}>
            <RentalMediaCard rentalCar={rental} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default HomeView