<template>
  <div class="m-20 tab-content">
    <div class="my-10 flex justify-center gap-x-5 ">
        <div class="relative">
            <span
              @click="handleChangeContents(index)"
              v-for="(item, index) in props.datas"
              :key="index"
              :class="index === active ? 'text-primary' : ''"
              class="px-2 py-1 cursor-pointer uppercase font-bold hover-line"
              >{{ item.tab }}</span
              >
        </div>
    </div>
    <div
      v-for="(items, index) in props.datas"
      :key="index"
      :class="active === index ? 'block' : 'hidden'"
    >
    <swiper
      :slidesPerView="1"
      :spaceBetween="10"
      :navigation="true"
      :pagination="{
        clickable: true,
      }"
      :breakpoints="{
        '640': {
          slidesPerView: 1,
          //   spaceBetween: 20,
        },
        '768': {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        '1024': {
          slidesPerView: 4,
          spaceBetween: 10,
        },
      }"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide
        v-for="(item, index) in items.contents" :key="index"
        class="flex "
      >
      <ProductCard
        :data="item"
      />
      </swiper-slide>
    </swiper>
    </div>

    <!-- sdf -->

    <!-- sfgb -->
  </div>
</template>
<script setup>
import { ref } from "vue";

import ProductCard from "./ProductCard.vue";

import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const modules = ref([Navigation, Pagination]);
const active = ref(0);


const props = defineProps({
  datas: Array,
});


const handleChangeContents = (index) => {
  active.value = index;

};

</script>
<style>

@media (max-width: 640px) {
  .tab-content .swiper-pagination.swiper-pagination-clickable.swiper-pagination-bullets.swiper-pagination-horizontal {
    display: none;
  }
}

@media (min-width: 992px) {
    .tab-content .swiper-button-next,
    .tab-content .swiper-button-prev {
    background: #ccc;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    position: absolute;
    top: 50%;
    transform: translateY(-100%);
    opacity: 0.35;
  }
  .tab-content .swiper-button-next {
    right: 0;
  }
  .tab-content .swiper-button-prev {
    left: 0;
  }

  .tab-content .swiper-button-next::after,
  .tab-content .swiper-button-prev::after {
    font-size: 25px;
    color: black;
  }

  .tab-content .swiper-button-next:hover,
  .tab-content .swiper-button-prev:hover {
    opacity: 1;
    background-color: #ffcb36;
  }
}
.tab-content .swiper.swiper-initialized.swiper-horizontal.mySwiper.swiper-backface-hidden {
    padding: 9px;
}

.tab-content .swiper-pagination{
    position: relative;
    margin-top: 40px;
}

.tab-content .slide-item:hover {
  transition: all 0.5s ease;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
}

.tab-content .swiper-pagination-bullet {
  position: relative;
  background: transparent;
  margin: 0 10px !important;
  width: 25px;
  height: 25px;

}
.tab-content .swiper-button-disabled {
    display: none;
}

.tab-content .swiper-pagination-bullet::after,

.tab-content .swiper-pagination-bullet.swiper-pagination-bullet-active::after {
  content: "";
  position: absolute;
  background-color: white;
  width: 25px;
  height: 2px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}


.tab-content .swiper-pagination-bullet.swiper-pagination-bullet-active::before {
  content: "";
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: transparent;
  box-shadow: 0 0 1px 2px white;
}

.tab-content .swiper-pagination-bullet.swiper-pagination-bullet-active {
  position: relative;
}

</style>
