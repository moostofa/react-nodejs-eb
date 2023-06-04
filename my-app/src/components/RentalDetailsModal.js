import DoneIcon from '@mui/icons-material/Done';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useApplicationContext } from '../contexts/ApplicationContext';
import RentalDetailsTable from './RentalDetailsTable';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 0.8,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function RentalDetailsModal({ rentalCar, open, handleClose }) {
  const { addToCart, cartContains, isAvailable } = useApplicationContext();
  const existsInCart = cartContains(rentalCar);
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography variant="h4">
            {rentalCar.name}
          </Typography>
          <br />
          <RentalDetailsTable rentalCar={rentalCar} />
          < br />
          {/* Button appearance changes depending on whether this item is in the cart or not */}
          {
            isAvailable(rentalCar) && rentalCar.availability === "True" ? (
              <Button
                size="large"
                variant='contained'
                color={existsInCart ? 'info' : 'success'}
                endIcon={existsInCart ? <DoneIcon /> : <ShoppingCartIcon />}
                onClick={() => addToCart(rentalCar)}
                disabled={existsInCart}
              >
                {existsInCart ? 'Added to Cart' : 'Add to cart'}
              </Button>
            ) :
              <div>
                <p>Sorry, this car is not available now. Please try other cars.</p>
                <p>Dear Marker,</p>
                <p>For your convenience, you delete the Renting History item which contains this car to make it available again.</p>
              </div>
          }
          {/* Display a message when a rental item already exists in cart */}
          {existsInCart &&
            <div>
              <p>This car has already been added to your cart!</p>
              <p>You can select the number of days you wish to rent this car for during checkout.</p>
            </div>
          }
        </Box>
      </Fade>
    </Modal>
  );
}