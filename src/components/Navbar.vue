<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const searchQuery = ref(route.query.q || '');
const selectedCategory = ref(route.query.category || '');

const categories = [
  'business',
  'entertainment',
  'general',
  'health',
  'science',
  'sports',
  'technology'
];

const onSearch = () => {
    const query = {};
    if (searchQuery.value.trim()) query.q = searchQuery.value.trim();
    if (selectedCategory.value) query.category = selectedCategory.value;
    router.push({ 
        path: '/', 
        query
    });
  searchQuery.value = '';
};

const onCategoryChange = () => {
    const query = {};
    if (selectedCategory.value) query.category = selectedCategory.value;
    if (searchQuery.value.trim()) query.q = searchQuery.value.trim();
    router.push({ 
        path: '/', 
        query: { 
            category: selectedCategory.value 
        } 
    });
};
</script>

<template>
  <nav class="navbar">
    <div class="left">
        <form @submit.prevent="onSearch">
        <input type="text" v-model="searchQuery" placeholder="Search news..." />
        <button type="submit">Search</button>
        </form>

        <select v-model="selectedCategory" @change="onCategoryChange">
          <option value="">All Categories</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
    </div>

    <div class="right">
        <router-link to="/">Home</router-link>
        <router-link to="/favorites">Favorites</router-link>
    </div>

  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
}

.left {
  display: flex;
  gap: 8px;
  align-items: center;
}

.search-form {
  display: flex;
  gap: 4px;
}

.right {
  display: flex;
  gap: 12px;
}
</style>