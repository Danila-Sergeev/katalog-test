<template>
  <div class="card__box" @click="openPopup(product)">
    <img :src="product.image" :alt="product.title" class="card__img" />
    <div class="card__title">{{ product.title }}</div>
    <div class="card__cost">{{ product.cost }} ₽</div>
    <button class="card__btn" @click.stop="addItemToCart">
      Добавить в корзину
    </button>
  </div>
  <ProductPopup
    v-if="isPopupOpen"
    :product="selectedProduct"
    @close="closePopup"
  />
</template>

<script setup>
import { addToCart } from "@/services/cart";
import ProductPopup from "./ProductPopup.vue";
import { ref } from "vue";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const isPopupOpen = ref(false);
const selectedProduct = ref(null);

//функции открытия/закрытия попапа
const openPopup = (product) => {
  selectedProduct.value = product;
  isPopupOpen.value = true;
};
const closePopup = () => {
  isPopupOpen.value = false;
};

//Добавление товара в корзину
const addItemToCart = () => {
  isPopupOpen.value = false;
  addToCart(props.product);
  isPopupOpen.value = false;
};
</script>
<style>
.card__box {
  border: 1px;
  border-radius: 10px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  width: 220px;
  height: 310px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  justify-content: space-between;
  cursor: pointer;
}
.card__img {
  max-width: 200px;
}
.card__title {
  text-align: center;
  max-height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  box-sizing: border-box;
}
.card__btn {
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.card__btn:hover {
  background-color: #45a049;
  transform: translateY(-2px);
}
.card__btn:active {
  transform: translateY(1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
