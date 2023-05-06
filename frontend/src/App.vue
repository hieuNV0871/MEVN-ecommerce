<script setup>
  import BackToTop from './layouts/components/BackToTop.vue';
  import { cartStore } from './stores/cart';
  import { authStore } from './stores/auth';


  const cart = cartStore()
  const auth = authStore()

  cart.getCarts()

  async function checkTokenExpiry() {
  const currentTime = Date.now()
  const tokenExpirationTime = auth.timeExpried
    if(currentTime >= tokenExpirationTime){
      await auth.logout()
      router.replace('/auth/login')
    }
  }
checkTokenExpiry()
</script>

<template>
  <component :is=" $route.meta.layout">
      <!-- same route like /user/user1 navigate to /user/user2 will detect so use :key to reactive  -->
    <router-view :key="$route.path"/> 

  </component>
  <BackToTop/>
</template>

<style scoped>
  
</style>
