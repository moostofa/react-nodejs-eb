import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/LocalStorage";

const ApplicationContext = createContext({});

// Export Application Context for use in other files
export const useApplicationContext = () => useContext(ApplicationContext);

// Wrapper which allows other components to access the Application Context
export const ApplicationContextProvider = ({ children }) => {
  // #################################################################################################
  // Rentals (Cars)
  // #################################################################################################

  // State
  const [rentals, setRentals] = useState([]);

  // Get the Rental Cars from JSON file when the page loads
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


  // #################################################################################################
  // Cart
  // #################################################################################################

  // State
  const [cartItems, setCartItems] = useLocalStorage("cart-items", []);

  // Add a rental car to the cart
  const addToCart = (item) => {
    if (!cartContains(item)) {
      setCartItems([...cartItems, { ...item, days: 1 }]);
    }
  }

  // Remove a rental car from the cart
  const removeFromCart = (item) => {
    setCartItems(items => items.filter(cartItem => item.id !== cartItem.id));
  }

  // Check if an item already exists in the cart
  const cartContains = (item) => !!cartItems.find(cartItem => item.id === cartItem.id);

  // Set the amount of rental days for a car chosen by the customer
  const setRentalDays = (id, days) => {
    if (days && days > 0 && days <= 10) { // Min: 1 day, Max: 10 days
      setCartItems(currentItems => currentItems.map(item => id === item.id ? { ...item, days } : item))
    }
  }

  // Clear the cart
  const clearCart = () => setCartItems([]);

  // #################################################################################################
  // Renting History
  // #################################################################################################

  // State
  const [rentingHistory, setRentingHistory] = useLocalStorage("Renting_History", []);

  // Save a rental order
  const saveRentalOrder = (data) => {
    setRentingHistory([...rentingHistory, data]);

    // Update the availability of the rental car to false
    const updatedRentals = rentals;
    data.rentals.forEach(rental => {
      rentals[rental.id - 1].availability = "False";
    })
    setRentals(updatedRentals);
  }

  // Verify whether a rental is available or not
  const isAvailable = (rental) => {
    for (const history of rentingHistory) {
      for (const rentedCar of history.rentals) {
        if (rental.id === rentedCar.id) {
          return false;
        }
      }
    }
    return true;
  }

  return (
    <ApplicationContext.Provider value={{
      rentals,
      cartItems,
      addToCart,
      removeFromCart,
      cartContains,
      setRentalDays,
      clearCart,
      rentingHistory,
      setRentingHistory,
      saveRentalOrder,
      isAvailable
    }}>
      {children}
    </ApplicationContext.Provider>
  );
}