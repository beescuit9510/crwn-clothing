import { createContext, useReducer } from 'react';

import { createAction } from '../utils/reducer/reducer.utils';

const addCartItem = (cartItems, productToAdd) => {
  const { id: productId } = productToAdd;

  const foundItem = cartItems.find(({ id }) => productId === id);

  if (foundItem) {
    foundItem.quantity++;
    return [...cartItems];
  } else {
    return [...cartItems, { ...productToAdd, quantity: 1 }];
  }
};
const removeCartItem = (cartItems, productToRemove) => {
  const newCartItems = cartItems.filter((item) => {
    if (item.id !== productToRemove.id) return true;

    item.quantity--;

    if (item.quantity <= 0) return false;

    return true;
  });

  return newCartItems;
};

const clearCartItem = (cartItems, productToRemove) => {
  const newCartItems = cartItems.filter(
    (item) => item.id !== productToRemove.id
  );

  return newCartItems;
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartTotal: 0,
});

export const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return { ...state, ...payload };

    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return { ...state, isCartOpen: payload };

    default:
      throw new Error(`unhandled type ${type} in userReducer`);
  }
};

const INITIAL_STATE = {
  isCartOpen: true,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const { isCartOpen, cartItems, cartCount, cartTotal } = state;

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (previous, current) => previous + current.quantity,
      0
    );

    const newCartTotal = newCartItems.reduce(
      (previous, current) => previous + current.price * current.quantity,
      0
    );

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartCount: newCartCount,
        cartTotal: newCartTotal,
      })
    );
  };

  const addItemToCart = (productToAdd) => {
    const newCartItem = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItem);
  };
  const removeItemFromCart = (productToRemove) => {
    const newCartItem = removeCartItem(cartItems, productToRemove);
    updateCartItemsReducer(newCartItem);
  };

  const clearItemFromCart = (cartITemToClear) => {
    const newCartItem = clearCartItem(cartItems, cartITemToClear);
    updateCartItemsReducer(newCartItem);
  };

  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
    removeItemFromCart,
    clearItemFromCart,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
