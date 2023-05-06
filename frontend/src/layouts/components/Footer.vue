<script setup>
import { ref } from "vue";
const footerLinks = ref([
  {
    title: "Về chúng tôi",
    navLinks: [
      { to: "", title: "title1_1" },
      { to: "", title: "title1_2" },
      { to: "", title: "title1_3" },
    ],
  },
  {
    title: "Liên hệ",
    navLinks: [
      { to: "", title: "title2_1" },
      { to: "", title: "title2_2" },
      { to: "", title: "title2_3" },
      { to: "", title: "title2_4" },
    ],
  },
  {
    title: "Thông tin",
    navLinks: [
      {
        to: "",
        title: "title3_1",
      },
      {
        to: "",
        title: "title3_2",
      },
      {
        to: "",
        title: "title3_3",
      },
    ],
  },
]);
</script>
<template>
  <footer>
    <div>
      <div class="flex xl:flex-row flex-col px-20 py-10 border-t">
        <div class="xl:grid hidden grid-cols-3 gap-x-5 flex-1">
          <ul
            v-for="(footerLink, index) in footerLinks"
            :key="index"
            class="list-none"
          >
            <h3 class="text-xl font-semibold uppercase mb-3">
              {{ footerLink.title }}
            </h3>
            <li
              v-for="(navLink, index) in footerLink.navLinks"
              :key="index"
              class="my-3"
            >
              <router-link :to="navLink.to" class="hover:text-primary py-1">
                {{ navLink.title }}
              </router-link>
            </li>
          </ul>
        </div>
        <div class="xl:w-1/3">
          <div class="mb-5 font-bold text-3xl text-primary">NVH-SHOP</div>
          <div class="flex flex-col gap-y-2">
            <h3 class="font-bold">
              dien thoai:
              <a class="font-normal hover:text-primary" href="tel:0911015591">0911015591</a>
            </h3>
            <h3 class="font-bold">
              email:
              <a class="font-normal hover:text-primary" href="mailto:0911015591"
                >hieunv0871@gmail.com</a
              >
            </h3>
            <h3 class="font-bold">
              hotline:
              <a class="font-normal hover:text-primary" href="tel:0911015591">0911015591</a>
            </h3>
            <h3 class="">
              <b>thoi gian lam viec:</b> 8h-21h30 tat ca cac ngay trong tuan
              (tru ngay le, tet)
            </h3>
          </div>
        </div>
      </div>
      <div class="flex justify-center items-center bg-black py-3 text-primary">
        @copyright: Hieu NV
      </div>
    </div>
  </footer>
</template>
<style></style>
