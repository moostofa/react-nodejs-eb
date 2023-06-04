import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HistoryIcon from '@mui/icons-material/History';
import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Stack } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useApplicationContext } from '../contexts/ApplicationContext';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 0.6,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function RentingHistoryModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { rentingHistory, setRentingHistory } = useApplicationContext();

  const modalContent = (
    <div style={{
      px: 4, mt: 2, maxHeight: "80vh", overflowY: "auto"
    }}>
      <Typography id="modal-modal-title" variant="h4" component="h2">
        Renting History
      </Typography>
      {rentingHistory.length ? rentingHistory.map(history => (
        <Accordion key={history.date}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography>
              {`${history.email} - ${new Date(history.date).toLocaleDateString()} - ${history.rentals.length} Rentals`}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack>
              <Button
                variant='contained'
                color='error'
                onClick={() => setRentingHistory(rentingHistory.filter(hist => hist !== history))}
              >
                Delete
              </Button>
              <Typography variant='h6' component='u'>
                Customer Details
              </Typography>
              <Typography>
                Full Name: {`${history.firstName} ${history.lastName}`}
              </Typography>
              <Typography>
                Email Address: {`${history.email}`}
              </Typography>
              <Typography>
                Full Address: {`${history.address1} ${history.address2} ${history.suburb} ${history.state} ${history.postcode}`}
              </Typography>
              <Typography variant='h6' component='u'>
                Payment Details
              </Typography>
              <Typography>
                Name on Card: {history.cardName}
              </Typography>
              <Typography>
                Card Number: {history.cardNumber.replace(/\d(?=\d{4})/g, "*")}
              </Typography>
              <Typography>
                Bond Amount: {history.bondAmound}
              </Typography>
              <Typography variant='h6' component='u'>
                Rentals
              </Typography>
              <List>
                {history.rentals.map(rental => (
                  <ListItem key={rental.name} alignItems='flex-start'>
                    <ListItemAvatar>
                      <Avatar alt={rental.name} src={rental.imageUrl} />
                      <ListItemText
                        primary={
                          `${rental.name} - Rent for ${rental.days} days 
                          at a price of $${rental.pricePerDay} Per Day. 
                          Total cost = $${rental.pricePerDay * rental.days}`
                        }
                      >
                      </ListItemText>
                    </ListItemAvatar>
                  </ListItem>
                ))}
              </List>
            </Stack>
          </AccordionDetails>
        </Accordion>
      )) :
        <Typography>
          You have no renting history.
        </Typography>
      }
    </div>
  );

  return (
    <div>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleOpen}>
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary="Renting History" />
          </ListItemButton>
        </ListItem>
      </List>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {modalContent}
        </Box>
      </Modal>
    </div>
  );
}