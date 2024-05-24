import { API_URL, getStorage } from './const.js';

export const fetchProductByCategory = async (category) => {
  try {
    const response = await fetch(`${API_URL}/api/products/category/${category}`)

    if (!response.ok) {
      throw new Error(response.status);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const fetchProductsListCart = async (cartItems) => {
  try {
    const productCartList = cartItems.join(', ');
    const response = await fetch(`${API_URL}/api/products/list/${productCartList}`);

    if (!response.ok) {
      throw new Error(response.status);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const fetchOrder = async (body) => {
  try {
    const response = await fetch(`${API_URL}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(response.status);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}