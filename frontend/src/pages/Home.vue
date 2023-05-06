<template>
  <div>
    <Slider v-if="sliders" :sliders="sliders" />
    <Banner v-if="banners" :banners="banners" />
    <TabContent v-if="dataTabProducts.length" :datas="dataTabProducts" />
    <ProductByCategory
      v-if="productByCategory1.length"
      :datas="productByCategory1"
      categoryName = "Quần áo nam"
    />
    <ProductByCategory
      v-if="productByCategory2.length"
      :datas="productByCategory2"
      categoryName = "Quần áo nữ"

    />
  </div>
</template>
<script setup>
import { ref } from "vue";

import request from "../utils/request";
import Slider from "../layouts/components/Slider.vue";
import Banner from "../layouts/components/Banner.vue";
import ProductByCategory from "../components/ProductByCategory.vue";
import TabContent from "../components/TabContent.vue";

// @reactive variable
const sliders = ref([]);
const banners = ref([]);
const productByCategory1 = ref([]);
const productByCategory2 = ref([]);

const dataTabProducts = ref([
  {
    tab: "Sản phẩm mới",
    contents: [],
  },
  {
    tab: "Sản phẩm bán chạy",
    contents: [],
  },
]);

// @methods

const fetchSliders = async () => {
  const res = await request.get("slider/get_all");
  sliders.value = res.data.data[0].images;
};

const fetchBanners = async () => {
  const res = await request.get("banner/get_all");
  banners.value = res.data.data[0].images;
};
const fetchProductByCategory = async (categoryName) => {
  const res = await request.get(
    `product/get_product_by_category/${categoryName}?limit=8`
  );
  return res.data.data;
};
fetchSliders();
fetchBanners();

const getProductByCategory = async () => {
  productByCategory1.value = await fetchProductByCategory("Quần áo nam");
  productByCategory2.value = await fetchProductByCategory("Quần áo nữ");
};
getProductByCategory();

async function fetchProducts() {
  const res = await request.get("product/get_all");
  const product = res.data.data;
  return product;
}
// async function processProducts() {
//   const products = await fetchProducts();

//   for (let i = 0; i < products.length; i++) {
//     const product = products[i];
//     for (let j = 0; j < dataTabProducts.value.length; j++) {
//       if (true) {
//         dataTabProducts.value[j].contents.push(product);
//         break;
//       }
//     }
//   }
// }
// processProducts();
async function pushRandomProducts() {
  const numProducts = 10; 
  const products = await fetchProducts();

  dataTabProducts.value.forEach((tab) => {
    for (let i = 0; i < numProducts; i++) {
      const randomIndex = Math.floor(Math.random() * products.length);
      tab.contents.push(products[randomIndex]);
    }
  });
}
pushRandomProducts()
</script>
<style></style>
