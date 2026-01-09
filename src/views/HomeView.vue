<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import EachArticle from '../components/EachArticle.vue';

const api_key = import.meta.env.VITE_NEWS_API_KEY;
const route = useRoute();
const articles = ref([]);
const loading = ref(false);
const page = ref(1);
const pageSize = 10;
const totalResults = ref(0);

const fetchNews = async () =>{
  /*
  return[array] : array from the news api
  */
 if(loading.value) return;
 loading.value=true;
 try{
    const searchQuery = route.query.q || '';
    const category = route.query.category || '';

    const url=`
    https://newsapi.org/v2/top-headlines?country=us&language=en&sortBy=popularity&pageSize=20
    &apiKey=${api_key}&pageSize=${pageSize}&page=${page.value}`
    +(category?`&category=${category}`:'')
    +(searchQuery?`&q=${encodeURIComponent(searchQuery)}`:'');


    const response = await axios.get(url);
    totalResults.value = response.data.totalResults;
    articles.value.push(...response.data.articles); //append new articles
    page.value+=1;
    console.log(articles.value);
 }
 catch(err){
  console.error('There was an error fetching the data:', err)
  articles.value=[];
 }
 finally{
  loading.value = false;
 }
};

const infiniteScrollHandler = () =>{
  const scrollBottom = window.innerHeight + window.scrollY;
  const pageHeight = document.documentElement.offsetHeight;

  if (scrollBottom + 300 >= pageHeight) {
    if (articles.value.length < totalResults.value) {
      fetchNews();
    }
  }
}

onMounted(() => {
  fetchNews();
  window.addEventListener('scroll', infiniteScrollHandler);
});

onUnmounted(()=>{
  window.removeEventListener('scroll', infiniteScrollHandler);
})

watch(() => route.query, () => {
  console.log(route.query.category)
  articles.value=[],
  page.value=1;
  totalResults.value=0;  
  fetchNews();
}); //check for route updates


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
