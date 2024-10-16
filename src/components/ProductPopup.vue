<template>
  <div class="popup" @click="handleOutsideClick">
    <div class="popup__content" ref="popupContent">
      <img :src="product.image" :alt="product.title" class="popup__image" />
      <h2>{{ product.title }}</h2>
      <h4>{{ product.subtitle }}</h4>
      <p><strong>Код товара:</strong> {{ product.vendorCode }}</p>
      <p><strong>Цена:</strong> {{ product.cost }} ₽</p>
      <p v-if="product.oldCost && product.oldCost > product.cost">
        <del>{{ product.oldCost }} ₽</del>
      </p>
      <button class="popup__close-btn" @click="closePopup">Закрыть</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  product: Object,
});

const emit = defineEmits(["close"]);
const popupContent = ref(null);

const closePopup = () => {
  emit("close");
};

// Функция для обработки кликов вне попапа
const handleOutsideClick = (event) => {
  if (popupContent.value && !popupContent.value.contains(event.target)) {
    closePopup();
  }
};
</script>

<style scoped>
.popup {
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

.popup__content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  max-width: 90%;
  text-align: center;
}

.popup__close-btn {
  background-color: #ff5c5c;
  border: none;
  padding: 8px 16px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px;
  margin-bottom: 20px;
}

.popup__image {
  width: 100%;
  height: auto;
  margin-bottom: 15px;
}
</style>
