<template>
  <div class="card-list__card">
    <Card v-for="product in products" :key="product.id" :product />
  </div>
</template>

<script setup>
import { fetchProducts } from "@/services/api";
import { ref, onMounted } from "vue";
import Card from "./Card.vue";

const products = ref([]);

onMounted(async () => {
  products.value = await fetchProducts();
  console.log(products.value); // Проверка данных
});
</script>

<style>
.card-list__card {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-top: 40px;
}
</style>
