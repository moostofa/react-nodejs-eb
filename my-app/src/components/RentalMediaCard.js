import DoneIcon from '@mui/icons-material/Done';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { useApplicationContext } from '../contexts/ApplicationContext';
import RentalDetailsModal from './RentalDetailsModal';

export default function RentalMediaCard({ rentalCar }) {
  const { addToCart, cartContains } = useApplicationContext();
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const handleOpen = () => setDetailsModalOpen(true);
  const handleClose = () => setDetailsModalOpen(false);
  const existsInCart = cartContains(rentalCar);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={rentalCar.name}
        height="140"
        image={rentalCar.imageUrl}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {rentalCar.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {rentalCar.description}
        </Typography>
      </CardContent>
      <CardActions>
        {/* Button appearance changes depending on whether this item is in the cart or not */}
        <Button
          size="small"
          variant='contained'
          color={existsInCart ? 'info' : 'success'}
          endIcon={existsInCart ? <DoneIcon /> : <ShoppingCartIcon />}
          onClick={() => addToCart(rentalCar)}
          disabled={existsInCart}
        >
          {existsInCart ? 'Added to Cart' : 'Add to cart'}
        </Button>
        {/* Button used to open the rental details modal */}
        <Button
          size="small"
          variant='contained'
          onClick={handleOpen}
        >
          Show details
        </Button>
        <RentalDetailsModal
          rentalCar={rentalCar}
          open={detailsModalOpen}
          handleClose={handleClose}
        />
      </CardActions>
    </Card>
  );
}
