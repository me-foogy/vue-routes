<script setup>
import { defineProps } from 'vue';
import { handleFavorites } from '../composables/handleFavorites';

const { addFavorite, removeFavorite, isFavorite } = handleFavorites();
const props = defineProps({
  article: {
    type: Object,
    required: true
  }
});

const toggleFavorite = () => {
  if (isFavorite(props.article)) {
    removeFavorite(props.article);
  } else {
    addFavorite(props.article);
  }
};
</script>

<template>
  <div class="news-card">
    <img :src="article.urlToImage || 'https://placehold.co/600x400'" alt="News Image" class="news-image" />
    <div class="news-content">
      <div class="information">
          <h3 class="news-title">{{ article.title }}</h3>
          <p class="news-source">{{ article.source.name }}</p>
          <p class="news-description">{{ article.description }}</p>
      </div>
      <div class="actions">
        <a :href="article.url" target="_blank" class="read-more">Read more</a>
        <button class="favourite-btn" @click="toggleFavorite">
        {{ isFavorite(article) ? 'Remove from Favorites' : 'Add to Favorites' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.news-card {
  display: flex;
  gap: 1rem;
  border: 1px solid gray;
  padding: 1rem;
  border-radius: 0.25rem;
}

.news-image {
  width: 30rem;
  height: 25rem;
  object-fit: cover;
  border-radius: 0.25rem;
}

.news-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.news-title {
  margin: 0 0 2rem 0;
  font-size: 2.5rem;
  font-weight: bold;
}

.news-source {
  font-size: 0.9rem;
  color: gray;
  margin-bottom: 0.5rem;
}

.news-description {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.actions {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
}

.read-more {
  font-size: 0.9rem;
  color: blue;
  text-decoration: underline;
}

.favourite-btn {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  background-color: #eee;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  cursor: pointer;
}

.favourite-btn:hover {
  background-color: #ddd;
}
</style>
