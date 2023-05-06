<template>
    <div class="flex mx-20 my-10 gap-x-5 " ref="container">
      <div class=" min-w-[200px] p-2">
        <div>
            <h3 class="font-semibold text-xl">Danh Mục</h3>
            <div v-for="(item, index) in categories" :key="index">
                <span :class="selectedCategory === item  ? 'text-primary' : ''" class="cursor-pointer" @click="() => filterByCategory(item)">{{ item }}</span>
            </div>
        </div>
        <div >
            <h3 class="font-semibold text-xl">Giá</h3>
            <div>
          <label for="price-range" class="block font-medium text-white">Khoảng giá:</label>
          <span class="ml-2 text-white">{{ Number(priceRange.min).toLocaleString()}} đ - {{ Number(priceRange.max).toLocaleString() }} đ</span>

          <div class="flex items-center mt-1 w-2/3">
            <label for="" class="text-white mr-2">min</label>
            <input type="range" min="0" max="1000000" v-model="priceRange.min" class="w-full h-6 rounded-lg overflow-hidden appearance-none bg-gray-300">
          </div>
          <div class="flex items-center mt-1 w-2/3">
            <label for="" class="text-white mr-2">max</label>
            <input type="range" min="0" max="1000000" v-model="priceRange.max" class="w-full h-6 rounded-lg overflow-hidden appearance-none bg-gray-300">
          </div>
        </div>
        </div>
      </div>
      <div class="flex-1 ">
        <div v-if="visibleProducts.length" class="grid grid-cols-4 gap-3">
            <div v-for="(item, index) in visibleProducts" :key="index">
              <ProductCard :data="item"/>
            </div>
        </div>
        <div v-else>
            nothing
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watchEffect, onUnmounted } from 'vue';
  import request from '../utils/request';
  import ProductCard from '../components/ProductCard.vue';
  
  const products = ref([]);
  const visibleProducts = ref([]);
  const page = ref(1);
  const pageSize = 4;
  const selectedCategory = ref('all');
  const categories = ['all', 'Quần áo nam', 'Quần áo nữ'];
  const loadedPages = ref([1, 1, 1])
  
  const priceRange = ref({ min: 0, max: 1000000 });

  const filterByCategory = (category) => {
    selectedCategory.value = category;
    page.value = loadedPages.value[categories.indexOf(category)] || 1;
    scrollTo(0,0)
  };
  
  const fetchProducts = async (page) => {
    const res = await request.get(`product/get_all?page=${page}&limit=${pageSize}`);
    products.value = res.data.data;
  };
  
  const handleScroll = () => {
    const container = document.documentElement;
    const bottom = container.scrollHeight - container.clientHeight;
    if (container.scrollTop >= bottom) {
      loadMore();
    }
  };
  
  const loadMore = () => {
    page.value++;
    loadedPages.value[categories.indexOf(selectedCategory.value)] = page.value;
  };
  
  watchEffect(() => {
    if (selectedCategory.value === 'all') {
        const filterByCategory = products.value.slice(0, loadedPages.value[categories.indexOf('all')] * pageSize);
        const filteredProducts = filterByCategory.filter(product => {
            const prices = product.colors.map(color => color.price);
            const minPrice = Math.min(...prices);
            const maxPrice =  Math.max(...prices);
            return minPrice > priceRange.value.min && maxPrice < priceRange.value.max;
        });
      visibleProducts.value = filteredProducts
    } else {
        const filterByCategory = products.value.filter((product) => product.category === selectedCategory.value).slice(0, loadedPages.value[categories.indexOf(selectedCategory.value)] * pageSize);
        const filteredProducts = filterByCategory.filter(product => {
            const prices = product.colors.map(color => color.price);
            const minPrice = Math.min(...prices);

            const maxPrice =  Math.max(...prices);
            return minPrice > priceRange.value.min && maxPrice < priceRange.value.max;
        });
      visibleProducts.value = filteredProducts
    //   visibleProducts.value = products.value.filter((product) => product.category === selectedCategory.value).slice(0, loadedPages.value[categories.indexOf(selectedCategory.value)] * pageSize);
    }
  });
  
  fetchProducts(page.value);
  
  window.addEventListener('scroll', handleScroll);
  
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
  </script>
  
  <style>
  </style>