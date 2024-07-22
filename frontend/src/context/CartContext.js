import React, { createContext, useState, useEffect } from 'react';
import { createCart, getCartById, addToCart, deleteFromCart, clearCart, updateCartQty, purchaseCart } from '../services/cart.service';
import { getCartFromToken } from '../services/cookie.service';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const cartIdFromToken = getCartFromToken();
    if (cartIdFromToken) {
      setCartId(cartIdFromToken);
    }
  }, []);

  const fetchCart = async () => {
    if (cartId) {
      const cartData = await getCartById(cartId);
      setCart(cartData.products);
    }
  };

  const addItemToCart = async (productId) => {
    console.log('el cart', cartId)
    
    const result = await addToCart(cartId, productId);
    fetchCart();
  };

  const removeItemFromCart = async (productId) => {
    await deleteFromCart(cartId, productId);
    fetchCart();
  };

  const clearCartItems = async () => {
    await clearCart(cartId);
    fetchCart();
  };

  const updateItemQty = async (productId, quantity) => {
    await updateCartQty(cartId, productId, quantity);
    fetchCart();
  };

  const handlePurchase = async () => {
    const ticketData = await purchaseCart(cartId);
    setTicket(ticketData);
    fetchCart();
  };


  return (
    <CartContext.Provider value={{ cart, addItemToCart, removeItemFromCart, clearCartItems, updateItemQty, handlePurchase, fetchCart, ticket}}>
      {children}
    </CartContext.Provider>
  );
};
