<template>
  <section class="md:my-20 my-8 md:mx-20 mx-1">
    <div>
      <div class="flex gap-x-72">
        <div class="haft-line-div my-10 w-1/2 after:left-0">
          <router-link :to="getCatalogLink">
            {{ props.categoryName }}
          </router-link>
        </div>
        <div class="haft-line-div my-10 w-1/2 after:right-0 text-end">
          <router-link :to="getCatalogLink" class="hover:underline">
            Xem tất cả
          </router-link>
        </div>
      </div>
      <div class="grid grid-cols-4 gap-4">
        <ProductCard
          v-for="(item, index) in props.datas"
          :key="index"
          :data="item"
        />
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, computed } from "vue";

import request from "../utils/request";
import ProductCard from "./ProductCard.vue";

const props = defineProps({
  datas: Array,
  categoryName: String,
});
// @reactive variable
const categories = ref([]);

// @computed
const getCatalogLink = computed(() => {
  if (categories.value) {
    const categoryName = props.datas.map((product) => product.category)[0];
    let slug = "";
    categories.value.map((category) => {
      if (category.name === categoryName) {
        slug = category.slug;
      }
    });
    return slug;
  }
});

// @methods
const getCategories = async () => {
  const res = await request.get("category/get_all");
  categories.value = res.data.data;
};

getCategories();

</script>
<style scoped>
.haft-line-div {
  position: relative;
}
.haft-line-div::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 4px;
  border-radius: 99px;
  bottom: -10px;
  background-color: #ffcb36;
}
</style>
