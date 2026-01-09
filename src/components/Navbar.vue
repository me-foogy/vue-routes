<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const searchQuery = ref('');
const selectedCategory = ref('');

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
  router.push({ 
    name: 'Home', 
    query: { 
        q: searchQuery.value, 
        category: selectedCategory.value 
    } 
    });
  searchQuery.value = '';
};

const onCategoryChange = () => {
  router.push({ 
    name: 'Home', 
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
        <router-link to="/favorites">Favourites</router-link>
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