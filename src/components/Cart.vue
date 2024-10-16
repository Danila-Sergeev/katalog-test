<template>
  <div class="cart__modal" v-if="isOpen" @click.self="closeCart">
    <div class="cart__content" @click.stop>
      <div class="cart__header">
        <h2>Корзина</h2>
        <button class="cart__btn-main" @click="closeCart">Закрыть</button>
      </div>
      <div v-if="cartItems.length === 0">Корзина пуста</div>
      <ul class="cart__ul">
        <li v-for="item in cartItems" :key="item.id" class="cart__item">
          <img :src="item.image" :alt="item.title" class="cart__item__img" />
          <div class="cart__item__info">
            <h3 class="cart__item__title">{{ item.title }}</h3>
            <p class="cart__item__cost">{{ item.cost }} р.</p>
            <div class="cart__quantity-control">
              <button
                class="cart__btn-toggle"
                @click="decreaseQuantity(item.id)"
              >
                -
              </button>
              <span>{{ item.quantity }}</span>
              <button
                class="cart__btn-toggle"
                @click="increaseQuantity(item.id)"
              >
                +
              </button>
            </div>
            <button class="cart__btn-main" @click="removeFromCart(item.id)">
              Удалить
            </button>
          </div>
        </li>
      </ul>
      <div class="cart__total">
        <strong>Итого: {{ totalCost }} ₽</strong>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeUnmount } from "vue";
import { getCart } from "@/services/cart";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  onClose: {
    type: Function,
    required: true,
  },
});

// Получаем товары из корзины
const cartItems = ref(getCart());

//Получаем сумму товаров
const totalCost = computed(() => {
  return cartItems.value.reduce(
    (total, item) => total + item.cost * item.quantity,
    0
  );
});

// Обновляем cartItems при изменении в localStorage
const updateCart = () => {
  cartItems.value = getCart();
};

// Слушаем событие обновления корзины
window.addEventListener("cartUpdated", updateCart);

// Функции для увеличения/уменьшения количества товара
const increaseQuantity = (id) => {
  const item = cartItems.value.find((item) => item.id === id);
  if (item) {
    item.quantity += 1; // Увеличиваем количество
    updateLocalStorage();
    // Генерируем событие обновления корзины
    window.dispatchEvent(new Event("cartUpdated"));
  }
};
const decreaseQuantity = (id) => {
  const item = cartItems.value.find((item) => item.id === id);
  if (item) {
    item.quantity -= 1; // Уменьшаем количество
    if (item.quantity <= 0) {
      removeFromCart(id); // Если количество меньше или равно 0, удаляем товар
    } else {
      updateLocalStorage();
      // Генерируем событие обновления корзины
      window.dispatchEvent(new Event("cartUpdated"));
    }
  }
};

// Функция для удаления товара из корзины
const removeFromCart = (id) => {
  cartItems.value = cartItems.value.filter((item) => item.id !== id);
  updateLocalStorage();

  window.dispatchEvent(new Event("cartUpdated"));
};

// Обновление localStorage после изменения корзины
const updateLocalStorage = () => {
  localStorage.setItem("cart", JSON.stringify(cartItems.value));
};

// Функция для закрытия корзины
const closeCart = () => {
  props.onClose();
};

// Очистка слушателя при уничтожении компонента
onBeforeUnmount(() => {
  window.removeEventListener("cartUpdated", updateCart);
});
</script>

<style>
.cart__modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.cart__content {
  background-color: white;
  padding: 20px;
  max-height: 600px;
  width: 50%;
  overflow-y: auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
.cart__ul {
  padding: 0;
}
.cart__header {
  display: flex;
  justify-content: space-between;
}
.cart__item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.cart__item:hover {
  background-color: #f7f7f7;
}

.cart__item__img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 5px;
}
.cart__quantity-control {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 10px;
}
.cart__total {
  margin-top: 20px;
  font-weight: bold;
  text-align: right;
}
.cart__btn-toggle {
  background-color: inherit;
  color: black;
  border-radius: 50%;
  border: 1px solid;
  cursor: pointer;
}
.cart__btn-main {
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cart__btn-main:hover {
  background-color: #45a049;
}
@media (max-width: 640px) {
  .cart__content {
    padding: 10px; /* Уменьшение отступов для мобильных */
    width: 95%; /* Увеличиваем ширину */
  }

  .cart__item {
    flex-direction: column; /* Упорядочить элементы по вертикали */
    align-items: flex-start; /* Выровнять по левому краю */
  }

  .cart__item__img {
    margin-bottom: 10px; /* Отступ под изображением */
  }

  .cart__total {
    font-size: 1.2em; /* Увеличение шрифта для итоговой суммы */
  }
}

@media (max-width: 420px) {
  .cart__item__img {
    width: 40px; /* Уменьшение размера изображения */
    height: 40px; /* Уменьшение размера изображения */
  }

  .cart__btn-toggle {
    width: 30px; /* Уменьшение кнопок для мобильных */
    height: 30px; /* Уменьшение кнопок для мобильных */
  }

  .cart__btn-main {
    padding: 8px 12px; /* Уменьшение отступов для кнопки */
  }
}
</style>
