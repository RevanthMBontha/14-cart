const reducer = (state, action) => {
  //   Loading stage
  if (action.type === 'LOADING') {
    return { ...state, isLoading: true };
  }
  //   Initial display of items in cart
  if (action.type === 'DISPLAY_ITEMS_IN_CART') {
    return { ...state, cart: action.payload, isLoading: false };
  }
  //   Increase the amount for each item in the cart
  if (action.type === 'INCREASE_ITEM') {
    let tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload) {
        return { ...cartItem, amount: cartItem.amount + 1 };
      }
      return cartItem;
    });
    return { ...state, cart: tempCart };
  }
  //   Decrease the amount for each item in the cart
  if (action.type === 'DECREASE_ITEM') {
    let tempCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload) {
          return { ...cartItem, amount: cartItem.amount - 1 };
        }
        return cartItem;
      })
      .filter((cartItem) => cartItem.amount !== 0);
    return { ...state, cart: tempCart };
  }
  //   Remove an item from the cart
  if (action.type === 'REMOVE_ITEM') {
    const remainingItemsInCart = state.cart.filter(
      (cartItem) => cartItem.id !== action.payload
    );
    return {
      ...state,
      cart: remainingItemsInCart,
    };
  }
  //   Clear the entire cart
  if (action.type === 'CLEAR_CART') {
    return { ...state, cart: [] };
  }
  //   Get the totals from each item in the cart
  if (action.type === 'GET_TOTALS') {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        const itemTotal = price * amount;

        cartTotal.total += itemTotal;
        cartTotal.amount += amount;
        return cartTotal;
      },
      {
        total: 0,
        amount: 0,
      }
    );
    total = parseFloat(total.toFixed(2));
    return { ...state, total, amount };
  }

  //   Default case if the action does not match any other cases
  return state;
};

export default reducer;
