<template>
  <div class="header__title">Candy shop</div>
  <div class="header__cart-box">
    <div class="header__cart-counter">{{ cartCount }}</div>
    <ButtonIcon @Click="toggleCart" class="header__btn-icon">
      <template #icon>
        <CarIcon class="header__cart" />
      </template>
    </ButtonIcon>
    <div class="header__total-cost">Итого: {{ totalCost }} ₽</div>
    <Cart :isOpen="isCartOpen" :onClose="toggleCart" />
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount, computed } from "vue";
import CarIcon from "@/assets/cartIcon.svg?component";
import { getCartCount } from "@/services/cart";
import Cart from "./Cart.vue";
import ButtonIcon from "./ButtonIcon.vue";
import { getCart } from "@/services/cart";

const cartCount = ref(getCartCount());
const isCartOpen = ref(false); // Состояние для открытия/закрытия корзины
const cartItems = ref(getCart()); // Получаем товары из корзины

const totalCost = computed(() => {
  return cartItems.value.reduce(
    (total, item) => total + item.cost * item.quantity,
    0
  );
});

const updateCartCount = () => {
  cartCount.value = getCartCount(); // Обновляем количество товаров в корзине
};

const updateCart = () => {
  cartItems.value = getCart();
};

// Слушаем событие обновления корзины
window.addEventListener("cartUpdated", updateCart);
// Слушаем событие добавления товара
window.addEventListener("cartUpdated", updateCartCount);

// Очистка слушателя при уничтожении компонента
onBeforeUnmount(() => {
  window.removeEventListener("cartUpdated", updateCart);
});

const toggleCart = () => {
  isCartOpen.value = !isCartOpen.value;
};
</script>

<style>
.header__title {
  font-weight: bold;
  font-size: 40px;
  margin: auto;
  text-align: center;
  font-family: "Courier New", Courier, monospace;
}
.header__cart {
  width: 25px;
  height: 25px;
}
.header__cart-box {
  display: flex;
  align-items: center;
  gap: 5px;
  position: fixed;
  top: 25px;
  right: 30px;
}
.header__btn-icon {
  padding: 0;
}
.header__total-cost {
  display: block; /* Показать по умолчанию */
}
@media (max-width: 640px) {
  .header__total-cost {
    display: none;
  }
}
@media (max-width: 420px) {
  .header__cart-box {
    position: relative;
    top: 0;
    right: 0;
    margin: auto;
    justify-content: center;
  }
}
</style>
