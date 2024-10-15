export const addToCart = (product) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  // Генерируем событие о обновлении корзины
  window.dispatchEvent(new Event("cartUpdated"));
};

export const getCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

export const getCartCount = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  return cart.reduce((total, item) => total + item.quantity, 0);
};
export const clearCart = () => {
  localStorage.removeItem("cart");
};
