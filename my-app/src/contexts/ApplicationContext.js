import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/LocalStorage";

const ApplicationContext = createContext({});

// Export Application Context for use in other files
export const useApplicationContext = () => useContext(ApplicationContext);

// Wrapper which allows other components to access the Application Context
export const ApplicationContextProvider = ({ children }) => {
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

  return (
    <ApplicationContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      cartContains,
      setRentalDays
    }}>
      {children}
    </ApplicationContext.Provider>
  );
}