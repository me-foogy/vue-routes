<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import EachArticle from '../components/EachArticle.vue';

const api_key = import.meta.env.VITE_NEWS_API_KEY;
const route = useRoute();
const articles = ref([]);
const loading = ref(true);

const fetchNews = async () =>{
  /*
  return[array] : array from the news api
  */
 loading.value=true;
 try{
    const searchQuery = route.query.q || '';
    const category = route.query.category || '';
    const url=`https://newsapi.org/v2/top-headlines?country=us&language=en&sortBy=popularity&pageSize=20&apiKey=${api_key}`+(category?`&category=${category}`:'')+(searchQuery?`&q=${searchQuery}`:'');
    const response = await axios.get(url);
    articles.value=response.data.articles;
    console.log(articles.value);
 }
 catch(err){
  console.error('There was an error fetching the data:', err)
  article.value=[];
 }
 finally{
  loading.value = false;
 }
}

onMounted(() => {
  fetchNews();
});

watch(() => route.query, () => fetchNews()); //check for route updates


</script>

<template>
  <div class="news-container">
    <EachArticle v-for="article in articles" :key="article.url" :article="article" />
  </div>
</template>


<style scoped>
.news-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
}
</style>
