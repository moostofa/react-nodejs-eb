import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, Button, IconButton, TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useApplicationContext } from '../contexts/ApplicationContext';

export default function CartView() {
  const { cartItems, removeFromCart, setRentalDays } = useApplicationContext();
  const [open, setOpen] = React.useState(false);

  // Handle the opening and closing of the drawer
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };

  return (
    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
      {/* Cart should appear as a drawer from the right side of the screen */}
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton size="large" aria-label="show 4 new mails" color="inherit" onClick={toggleDrawer(true)}>
            <Badge badgeContent={cartItems.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <Drawer
            anchor={anchor}
            open={open}
            onClose={toggleDrawer(false)}
          >
            {/* Display all the items in the cart as a List */}
            {
              cartItems.length &&
              <List sx={{ minWidth: 350, bgcolor: 'background.paper' }}>
                {cartItems.map(item => (
                  <React.Fragment key={item.id}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar alt={item.name} src={item.imageUrl} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.name}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              Price Per Day - $
                              {item.pricePerDay}
                              <br />
                              Price for {item.days} days: ${item.days * item.pricePerDay}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                      {/* Modify the number of rental days for a car  */}
                      <TextField
                        type='number'
                        label="Days"
                        defaultValue={item.days}
                        onChange={(e) => setRentalDays(item.id, e.target.value)}
                        inputProps={{ min: 1, max: 10 }}
                        sx={{ width: 0.3 }}
                      />
                    </ListItem>
                    <ListItem alignItems='flex-start'>
                      {/* Remove a Rental item from the cart */}
                      <Button
                        variant='contained'
                        size='small'
                        color='error'
                        onClick={() => removeFromCart(item)}
                      >
                        Remove {item.name}
                      </Button>
                    </ListItem>
                  </React.Fragment>
                ))}
                <ListItem>
                  {/* Head to the checkout screen */}
                  <Button
                    variant='contained'
                    size='large'
                  >
                    Checkout
                  </Button>
                </ListItem>
              </List>
            }
            {/* Display message if cart is empty */}
            {
              !cartItems.length &&
              <p>Your cart is empty</p>
            }
          </Drawer>
        </React.Fragment>
      ))}
    </Box>
  );
}