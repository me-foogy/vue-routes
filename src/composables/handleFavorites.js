import { ref, watch } from 'vue';

const STORAGE_KEY = 'favorite-news';
const favorites = ref([]);

const stored = localStorage.getItem(STORAGE_KEY);
if (stored) {
  try {
    favorites.value = JSON.parse(stored);
  } catch (e) {
    console.error('An error occured: ', e);
    favorites.value = [];
  }
}

watch(
  favorites,
  (newVal) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal));
  },
  { deep: true }
);

export function handleFavorites() {
  const addFavorite = (article) => {
    if (!favorites.value.find(a => a.url === article.url)) {
      favorites.value.push(article);
    }
  };

  const removeFavorite = (article) => {
    favorites.value = favorites.value.filter(
      a => a.url !== article.url
    );
  };

  const isFavorite = (article) => {
    return favorites.value.some(a => a.url === article.url);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite
  };
}
