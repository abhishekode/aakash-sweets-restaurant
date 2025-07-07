'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, getCart, saveCart, getCartTotal, getCartCount } from '@/lib/cart';

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, size: 'half' | 'full') => void;
  updateQuantity: (id: string, size: 'half' | 'full', quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const savedCart = getCart();
    setCart(savedCart);
    setCartTotal(getCartTotal());
    setCartCount(getCartCount());
  }, []);

  const addToCart = (item: CartItem) => {
    const existingItem = cart.find(
      (cartItem) => cartItem.id === item.id && cartItem.size === item.size
    );

    let newCart;
    if (existingItem) {
      newCart = cart.map((cartItem) =>
        cartItem.id === item.id && cartItem.size === item.size
          ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
          : cartItem
      );
    } else {
      newCart = [...cart, item];
    }

    setCart(newCart);
    saveCart(newCart);
    updateTotals(newCart);
  };

  const removeFromCart = (id: string, size: 'half' | 'full') => {
    const newCart = cart.filter(
      (item) => !(item.id === id && item.size === size)
    );
    setCart(newCart);
    saveCart(newCart);
    updateTotals(newCart);
  };

  const updateQuantity = (id: string, size: 'half' | 'full', quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, size);
      return;
    }

    const newCart = cart.map((item) =>
      item.id === id && item.size === size
        ? { ...item, quantity }
        : item
    );
    setCart(newCart);
    saveCart(newCart);
    updateTotals(newCart);
  };

  const clearCart = () => {
    setCart([]);
    saveCart([]);
    updateTotals([]);
  };

  const updateTotals = (cartItems: CartItem[]) => {
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setCartTotal(total);
    setCartCount(count);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};