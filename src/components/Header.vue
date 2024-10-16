<template>
  <div class="header__title">Candy shop</div>
  <div class="header__cart-box">
    <div @click="toggleCart" class="header___cart-counter-box">
      <div class="header__cart-counter">
        {{ cartCount }}
      </div>
      <ButtonIcon class="header__btn-icon">
        <template #icon>
          <CarIcon class="header__cart" />
        </template>
      </ButtonIcon>
    </div>

    <div class="header__total-cost">{{ totalCost }} ₽</div>
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

//Получаем сумму товаров
const totalCost = computed(() => {
  return cartItems.value.reduce(
    (total, item) => total + item.cost * item.quantity,
    0
  );
});

// Обновляем количество товаров в корзине
const updateCartCount = () => {
  cartCount.value = getCartCount();
};
// Обновляем корзину
const updateCart = () => {
  cartItems.value = getCart();
};

// Слушаем событие обновления корзины/добавления товара
window.addEventListener("cartUpdated", updateCart);
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
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 15px;
  right: 30px;
}
.header___cart-counter-box {
  display: flex;
  gap: 5px;
  cursor: pointer;
}
.header__btn-icon {
  padding: 0;
}
.header__total-cost {
  display: block; /* Показать по умолчанию */
}
@media (max-width: 420px) {
  .header__cart-box {
    position: relative;
    top: 0;
    right: 0;
    margin: auto;
    justify-content: center;
  }
  .header__total-cost {
    display: none;
  }
}
</style>
