<template>
  <div class="flex animation-appear" v-on-click-outside="handleClickOutside">
    <input
      v-model="searchValue"
      @focus="showSearchResult = true"
      ref="searchValueRef"
      type="search"
      spellcheck="false"
      placeholder="Tìm kiếm tại đây..."
      class="w-64 outline-none border-none px-2 py-1 bg-dark-gray focus:bg-white focus:text-black caret-primary rounded-2xl shadow-md shadow-dark-gray"
    />
    <SearchWrapper
      v-if="searchValue && showSearchResult"
      class="z-[999] top-10 text-light-text w-[110%]"
    >
      <div v-if="searchResult.length >= 1" @click="showSearchResult = false">
        <h4 class="text-start py-2 px-5">Kết quả tìm kiếm:</h4>
        <MenuItem :datas="searchResult" />
        <div class="flex justify-center">
          <router-link to="/" class="px-5 py-2 underline">
            Xem tất cả kết quả
          </router-link>
        </div>
      </div>
      <div v-else-if="searchResult.length <= 0">
        <h3 class="px-3">Không tìm thấy kết quả cho "{{ searchValue }}"</h3>
      </div>
    </SearchWrapper>
  </div>
</template>
<script setup>
import { ref, watch, onUnmounted } from "vue";
import { vOnClickOutside } from "@vueuse/components";

import request from "../utils/request";
import { useDebouncedRef } from "../hooks/useDebouncedRef";
import { Wrapper as SearchWrapper } from "./Popper/popper";
import MenuItem from "./Popper/MenuItem.vue";

// @reactive variable
const searchValue = useDebouncedRef("", 500);
const searchValueRef = ref(null);
const searchResult = ref([]);
const showSearchResult = ref(false);

// @computeds

// @methods
const fetchSearchResult = async () => {
  if (searchValue.value === "") {
    searchResult.value = [];
    showSearchResult.value = false;
  } else {
    const res = await request.get(
      `product/get_product?limit=5&search=${searchValue.value}`
    );

    searchResult.value = res.data.data;
    showSearchResult.value = true;
  }
};

const handleClickOutside = () => {
  showSearchResult.value = false;
};

const handleScroll = () => {
  if (window.scrollY >= 200) {
    showSearchResult.value = false;
    searchValueRef.value.blur();
  }
};

// @side effect
watch(searchValue, (newValue, oldValue) => {
  if (newValue.startsWith(" ")) {
    searchValue.value = "";
  } else {
    fetchSearchResult();
  }
});

// life cycle hook
window.addEventListener("scroll", handleScroll);

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
<style scoped>
.animation-appear {
  position: relative;
  animation: appear 0.5s ease-in;
}
@keyframes appear {
  0% {
    transform: translateX(-100%);
    opacity: 0;
    transition: all 0.5s ease-in;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
