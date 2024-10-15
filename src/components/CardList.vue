<template>
  <div class="card-list__container">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Поиск по названию..."
      class="card-list__search-input"
    />
    <div class="card-list__card">
      <SpinnerMain v-if="isLoading" />
      <Card
        v-else
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script setup>
import { fetchProducts } from "@/services/api";
import { ref, computed, onMounted } from "vue";
import Card from "./Card.vue";
import SpinnerMain from "./SpinnerMain.vue";

const products = ref([]);
const isLoading = ref(true);
const searchQuery = ref("");

onMounted(async () => {
  try {
    products.value = await fetchProducts();
  } catch (error) {
    console.error("Ошибка загрузки данных:", error);
  } finally {
    isLoading.value = false;
  }
});

const filteredProducts = computed(() => {
  if (!searchQuery.value) {
    return products.value;
  }
  return products.value.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<style scoped>
.card-list__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
}

.card-list__search-input {
  padding: 10px;
  width: 300px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 25px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  outline: none;
  transition: box-shadow 0.3s ease-in-out;
  background-color: inherit;
  color: black;
}

.card-list__search-input:focus {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  border-color: #4caf50;
}

.card-list__card {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}
@media (max-width: 420px) {
  .card-list__search-input {
    width: 200px;
  }
}
</style>
