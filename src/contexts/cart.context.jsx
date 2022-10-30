import { createContext, useState, useEffect, useReducer } from 'react';

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

const CART_ACTION_TYPES = {
  ADD_ITEM_TO_CART: 'ADD_ITEM_TO_CART',
  REMOVE_ITEM_FROM_CART: 'REMOVE_ITEM_FROM_CART',
  CLEAR_ITEM_FROM_CART: 'CLEAR_ITEM_FROM_CART',
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  const getPayloadFromCartItems = () =>
    state.cartItems.filter((item) => item.id === payload.id)[0];

  const filterPayloadFromCartItemsById = () =>
    (state.cartItems = state.cartItems.filter(
      (item) => item.id !== payload.id
    ));

  switch (type) {
    case CART_ACTION_TYPES.ADD_ITEM_TO_CART:
      const foundItemToAdd = getPayloadFromCartItems();

      if (foundItemToAdd) {
        foundItemToAdd.quantity++;
      } else {
        payload.quantity = 1;
        state.cartItems.push(payload);
      }

      break;

    case CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART:
      const foundItemToRemove = getPayloadFromCartItems();

      if (foundItemToRemove) {
        foundItemToRemove.quantity--;
      }
      if (foundItemToRemove.quantity <= 0) filterPayloadFromCartItemsById();

      break;

    case CART_ACTION_TYPES.CLEAR_ITEM_FROM_CART:
      filterPayloadFromCartItemsById();

      break;

    default:
      throw new Error(`unsupported cartReducer Type ${type}`);
  }

  state.cartCount = state.cartItems.reduce(
    (previous, current) => previous + current.quantity,
    0
  );

  state.cartTotal = state.cartItems.reduce(
    (previous, current) => previous + current.price * current.quantity,
    0
  );

  return { ...state };
};

const INITIAL_CART = {
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_CART);

  const { cartItems, cartCount, cartTotal } = state;

  const [isCartOpen, setIsCartOpen] = useState(false);

  const setCart = (type, payload) => {
    dispatch({ type: type, payload: payload });
  };

  const addItemToCart = (productToAdd) =>
    setCart(CART_ACTION_TYPES.ADD_ITEM_TO_CART, productToAdd);

  const removeItemFromCart = (productToRemove) =>
    setCart(CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART, productToRemove);

  const clearItemFromCart = (cartITemToClear) =>
    setCart(CART_ACTION_TYPES.CLEAR_ITEM_FROM_CART, cartITemToClear);

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
