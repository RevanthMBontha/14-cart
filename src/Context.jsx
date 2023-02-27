import React, { useState, useContext, useReducer, useEffect } from 'react';
import cartItems from './data';
import reducer from './Reducer';

const url = 'https://api-for-basic-projects.netlify.app/cart/cart_data.json';

const AppContext = React.createContext();

const initialState = {
  isLoading: false,
  cart: cartItems,
  total: 0,
  amount: 0,
};

// Context Provider Component
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = async () => {
    dispatch({ type: 'LOADING' });
    const response = await fetch(url);
    const cart = await response.json();
    dispatch({ type: 'DISPLAY_ITEMS_IN_CART', payload: cart });
  };

  const increaseItemInCart = (id) => {
    dispatch({ type: 'INCREASE_ITEM', payload: id });
  };

  const decreaseItemInCart = (id) => {
    dispatch({ type: 'DECREASE_ITEM', payload: id });
  };

  const removeItemFromCart = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    dispatch({ type: 'GET_TOTALS' });
  }, [state.cart]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        increaseItemInCart,
        decreaseItemInCart,
        removeItemFromCart,
        clearCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
