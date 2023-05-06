<template>
  <section class="md:mt-0 mt-5 slide-image">
    <swiper
      :spaceBetween="30"
      :effect="'fade'"
      :pagination="{
        clickable: true,
      }"
      :loop="true"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
      }"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide v-for="(slide, index) in sliders" :key="index">
        <router-link to="/" class="w-full select-none">
          <img :src="slide.src" alt="" class="w-full md:h-[500px] h-[300px]" />
        </router-link>
      </swiper-slide>
    </swiper>
  </section>
</template>
<script setup>
import { ref } from "vue";

import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { EffectFade, Navigation, Pagination, Autoplay } from "swiper";

const modules = ref([EffectFade, Navigation, Pagination, Autoplay]);

const props = defineProps({
  sliders: Array,
})


</script>

<style>
.slide-image .swiper-pagination-bullet {
  position: relative;
  background: transparent;
  margin: 0 10px !important;
  width: 20px;
  height: 20px;
}

.slide-image .swiper-pagination-bullet::after,
.slide-image .swiper-pagination-bullet.swiper-pagination-bullet-active::after {
  content: "";
  position: absolute;
  background-color: #000;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.slide-image .swiper-pagination-bullet.swiper-pagination-bullet-active::before {
  content: "";
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #000;
  background-color: transparent;
  box-shadow: 0 0 1px 2px #000;
}
.slide-image .swiper-pagination-bullet.swiper-pagination-bullet-active {
  position: relative;
}
</style>
