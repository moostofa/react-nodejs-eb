import { Stack, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import React, { useRef } from 'react';
import { useApplicationContext } from '../contexts/ApplicationContext';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function Checkout() {
  const { cartItems, clearCart, saveRentalOrder, rentingHistory } = useApplicationContext();

  // Textfield references

  // Customer Details
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const address1 = useRef();
  const address2 = useRef();
  const suburb = useRef();
  const state = useRef();
  const postCode = useRef();

  // Payment Details
  const cardName = useRef();
  const cardNumber = useRef();
  const cardExpiry = useRef();
  const cardCvv = useRef();

  // Form submission handlers

  // Handle Customer Details submission and open Payment Details
  const handleCustomerDetailsSubmit = (event) => {
    event.preventDefault();
    handlePaymentOpen();
  }

  // Submit full Customer + Payment details
  const handleSubmit = async (event) => {
    // Prevent form submission
    event.preventDefault();

    const data = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      email: email.current.value,
      address1: address1.current.value,
      address2: address2.current.value,
      suburb: suburb.current.value,
      state: state.current.value,
      postcode: postCode.current.value,
      cardName: cardName.current.value,
      cardNumber: cardNumber.current.value,
      cardExpiry: cardExpiry.current.value,
      cardCvv: cardCvv.current.value,
      rentals: cartItems.map(item => ({
        id: item.id, name: item.name, pricePerDay: item.pricePerDay, days: item.days, imageUrl: item.imageUrl
      })),
      date: new Date(),
      bondAmount: rentingHistory.length ? 0 : 200
    }

    // Save the online order
    saveRentalOrder(data);

    // Clear the cart
    clearCart();

    // Alert success (clicking OK will refresh the page)
    alert("Confirmation successful! A receipt will be sent to your email.");

    window.location.reload();
  }

  // Parent modal controls - "Customer Details"
  const [customerDetailsOpen, setCustomerDetailsOpen] = React.useState(false);
  const handleCustomerDetailsOpen = () => {
    setCustomerDetailsOpen(true);
  };
  const handleCustomerDetailsClose = () => {
    setCustomerDetailsOpen(false);
  };

  // Child Modal controls - "Payment Details"
  const [paymentOpen, setPaymentOpen] = React.useState(false);
  const handlePaymentOpen = () => {
    setPaymentOpen(true);
  };
  const handlePaymentClose = () => {
    setPaymentOpen(false);
  };

  // Child Modal HTML
  const paymentModal = (
    <Modal
      open={paymentOpen}
      onClose={handlePaymentClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box sx={{ ...style, width: 0.3 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} justifyContent="center" alignItems="center">
            <h2 id="child-modal-title">Payment Details</h2>
            <TextField type='text' label="Name on Card" fullWidth required inputRef={cardName} />
            <TextField type='text' label="Card Number" fullWidth required inputRef={cardNumber} />
            <Stack direction="row" spacing={1}>
              <TextField type='text' label="Expiry" placeholder='MM/YY' fullWidth required inputRef={cardExpiry} />
              <TextField type='number' label="CVV" fullWidth required inputRef={cardCvv} />
            </Stack>
            <Button type='submit' variant='contained' color='success'>Confirm</Button>
            <Button variant='contained' onClick={handlePaymentClose}>Go Back</Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );

  return (
    <div>
      <Button variant='contained' onClick={handleCustomerDetailsOpen}>Checkout</Button>
      <Modal
        open={customerDetailsOpen}
        onClose={handleCustomerDetailsClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 0.4 }}>
          <form onSubmit={handleCustomerDetailsSubmit}>
            <Stack spacing={2} justifyContent="center" alignItems="center">
              <h2 id="parent-modal-title">Customer Details</h2>
              <TextField type='text' label="First Name" fullWidth required inputRef={firstName} />
              <TextField type='text' label="Last Name" fullWidth required inputRef={lastName} />
              <TextField type='text' label="Email Address" fullWidth required inputRef={email} />
              <TextField type='text' label="Address Line 1" fullWidth required inputRef={address1} />
              <TextField type='text' label="Address Line 2" fullWidth inputRef={address2} />
              <Stack direction="row" spacing={1}>
                <TextField type='text' label="Suburb" required inputRef={suburb} />
                <TextField type='text' label="State" required inputRef={state} />
                <TextField type='number' label="Post Code" required inputRef={postCode} />
              </Stack>
              <Button type='submit' variant='contained' sx={{ width: 0.4 }}>Proceed to Payment</Button>
              <Button variant='contained' color='error' onClick={() => handleCustomerDetailsClose()} sx={{ width: 0.2 }}>Cancel</Button>
            </Stack>
          </form>
        </Box>
      </Modal>
      {paymentModal}
    </div>
  );
}