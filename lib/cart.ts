'use client';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: 'half' | 'full';
  image: string;
}

export const getCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  const cart = localStorage.getItem('fastbite-cart');
  return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cart: CartItem[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('fastbite-cart', JSON.stringify(cart));
};

export const addToCart = (item: CartItem) => {
  const cart = getCart();
  const existingItem = cart.find(
    (cartItem) => cartItem.id === item.id && cartItem.size === item.size
  );

  if (existingItem) {
    existingItem.quantity += item.quantity;
  } else {
    cart.push(item);
  }

  saveCart(cart);
};

export const removeFromCart = (id: string, size: 'half' | 'full') => {
  const cart = getCart();
  const updatedCart = cart.filter(
    (item) => !(item.id === id && item.size === size)
  );
  saveCart(updatedCart);
};

export const updateQuantity = (id: string, size: 'half' | 'full', quantity: number) => {
  const cart = getCart();
  const item = cart.find(
    (cartItem) => cartItem.id === id && cartItem.size === size
  );

  if (item) {
    if (quantity <= 0) {
      removeFromCart(id, size);
    } else {
      item.quantity = quantity;
      saveCart(cart);
    }
  }
};

export const clearCart = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('fastbite-cart');
};

export const getCartTotal = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const getCartCount = () => {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
};