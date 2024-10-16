const API_URL = "https://webapi.omoloko.ru/api/v1/products";

export async function fetchProducts(page = 1, limit = 10) {
  try {
    const url = `${API_URL}?page=${page}&limit=${limit}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    return data.products;
  } catch (error) {
    console.error("Ошибка при получении товаров:", error);
    return [];
  }
}
