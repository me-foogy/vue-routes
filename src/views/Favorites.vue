<script setup>
import EachArticle from '../components/EachArticle.vue';
import { handleFavorites } from '../composables/handleFavorites';
const { favorites } = handleFavorites();
</script>

<template>
  <div class="favourites-container">
    <h2>My Favourites</h2>
    <div v-if="favorites.length === 0">
      <p>No favourites yet.</p>
    </div>

    <EachArticle
      v-for="article in favorites"
      :key="article.url"
      :article="article"
    />
  </div>
</template>

<style scoped>
.favourites-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}
</style>
