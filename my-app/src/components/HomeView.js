import React, { useEffect, useState } from 'react'
import SearchAppBar from './SearchAppBar';
import RentalMediaCard from './RentalMediaCard';
import { Grid } from '@mui/material';

const HomeView = () => {
  const [rentals, setRentals] = useState([]);
  useEffect(() => {
    fetch("rentals.json", {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => setRentals(data))
  }, []);

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