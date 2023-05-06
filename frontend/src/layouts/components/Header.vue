<template>
  <header>
    <div
      ref="topNavRef"
      class="flex justify-between items-center py-2 px-5 border-b border-b-gray-300 bg-dark-bg"
    >
      <div class="flex gap-x-1 items-center">
        <a
          href="http://"
          target="_blank"
          rel="noopener noreferrer"
          class="flex px-1 text-primary hover:text-blue-500"
        >
          <FacebookOutlined :style="{ fontSize: '20px' }" class="" />
        </a>
        <a
          href="http://"
          target="_blank"
          rel="noopener noreferrer"
          class="flex px-1 text-primary hover:text-white"
        >
          <GithubOutlined :style="{ fontSize: '20px' }" />
        </a>
      </div>
      <div class="px-1">
        <span>
          hotline:
          <a class="hover:text-primary" href="tel:+84911015591">0911015591</a>
        </span>
      </div>
    </div>
    <div
      ref="mainNavRef"
      class="flex items-center justify-between py-5 px-28 transition-all duration-500 ease-linear"
    >
      <div>
        <router-link to="/">
          <img src="" alt="" />
          <h2 class="font-bold text-white">NVH-SHOP</h2>
        </router-link>
      </div>
      <div class="flex items-center">
        <router-link
          :to="navLink.to"
          v-for="(navLink, index) in navLinks"
          :key="index"
          class="px-3 py-1 hover-line"
        >
          {{ navLink.title }}
        </router-link>
      </div>
      <div class="flex gap-x-4">
        <div class="flex items-center gap-x-4">
          <Search v-if="isShowSearchInput" />
          <div
            @click="handleToggleSearch"
            class="p-2 bg-dark-gray shadow-xl hover:shadow-btn hover:bg-primary transition-all ease-linear duration-300 flex items-center rounded-full cursor-pointer"
          >
            <SearchOutlined />
          </div>

          <div
            @click="toggleCartList"
            ref="insideCartClickTriggerRef"
            :class="isShowCartList ? 'bg-primary' : ''"
            class="relative p-2 bg-dark-gray hover:shadow-btn hover:bg-primary transition-all ease-linear duration-300 flex items-center rounded-full cursor-pointer"
          >
            <ShoppingCartOutlined />
            <CartPopper
              v-if="isShowCartList"
              v-on-click-outside="handleClickOutsideCartList"
              class="absolute z-[999] right-0 w-max min-w-[300px] gap-y-3 top-12"
            >
              <div v-if="cart.carts.length">
                <router-link 
                  v-for="(item, index) in cart.carts"
                  :key="index"
                  :to="item.slug"
                  className="text-dark-bg flex items-center py-[6px] px-3 cursor-pointer hover:bg-[#16182308]"
                >
                  <img
                    :src="item.image"
                    alt=""
                    className="w-10 h-10 rounded object-cover"
                  />
                  <div className="flex-1 ml-3 overflow-hidden">
                    <h4
                      className="overflow-hidden text-ellipsis whitespace-nowrap block"
                    >
                      {{ item.name }}
                    </h4>
                    <span className="text-sm text-[#16182380]">{{
                      Number(item.price).toLocaleString()
                    }}</span>
                  </div>
                </router-link>
                <div class="flex justify-center mt-2">
                  <router-link to="/cart" class="text-dark-bg underline"
                    >Xem giỏ hàng</router-link
                  >
                </div>
              </div>
              <div v-else class="text-dark-bg flex justify-center items-center min-h-[200px]">khong co gi trong gio hang</div>
            </CartPopper>
            <span
              class="absolute top-0 left-3 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-primary rounded-full flex items-center justify-center text-black p-2"
              >{{
                cart.carts.length && auth.authUser.username
                  ? cart.carts.length
                  : 0
              }}</span
            >
          </div>
        </div>
        <div v-if="auth.userq.username" class="relative text-light-text">
          <img
            :src="auth.userq.avatar.src"
            @click="toggleInfoDropdown"
            alt=""
            ref="insideInfoClickTriggerRef"
            class="rounded-full w-10 h-10 cursor-pointer"
          />
          <div>
            <InfoPopper
              v-if="isShowInfoDropdown"
              v-on-click-outside="handleClickOutsideInfo"
              class="absolute z-[999] right-0 w-max gap-y-3 top-12"
            >
              <div class="flex flex-col gap-y-1">
                <router-link
                  to="/user"
                  class="btn rounded-none w-full hover:bg-slate-100 hover:text-cyan-500"
                >
                  Thông tin tài khoản
                </router-link>
                <router-link
                  to="/user/bill"
                  class="btn rounded-none w-full hover:bg-slate-100 hover:text-cyan-500"
                >
                  Đơn đặt hàng
                </router-link>
                <button
                  @click="onLogout"
                  class="flex items-center  gap-x-2 btn rounded-none w-full hover:bg-slate-100 hover:text-cyan-500"
                >
                  <LogoutOutlined />
                  Đăng xuất
                </button>
              </div>
            </InfoPopper>
          </div>
        </div>
        <div v-else>
          <router-link class="btn btn-outline-effect" to="/auth"
            ><span>Đăng nhập</span><i></i
          ></router-link>
        </div>
      </div>
    </div>
  </header>
</template>
<script setup>
import { ref, onUnmounted, computed } from "vue";
import { vOnClickOutside } from "@vueuse/components";

import { cartStore } from "../../stores/cart";
import { authStore } from "../../stores/auth";
import router from "../../routes/routes";

import {
  FacebookOutlined,
  LogoutOutlined,
  GithubOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
} from "@ant-design/icons-vue";

import Search from "../../components/Search.vue";
import { Wrapper as InfoPopper } from "../../components/Popper/popper";
import { Wrapper as CartPopper } from "../../components/Popper/popper";
import request from "../../utils/request";

// @reactive variable
const navLinks = ref([
  {
    title: "Trang chủ",
    to: "/",
  },
  {
    title: "Sản phẩm",
    to: "/products",
  },
  {
    title: "Phụ kiện",
    to: "/access",
  },
  {
    title: "Tin tức",
    to: "/news",
  },
]);
const isShowSearchInput = ref(false);
const topNavRef = ref(null);
const mainNavRef = ref(null);
const cartList = ref([]);
const isShowInfoDropdown = ref(false);
const isShowCartList = ref(false);
const insideInfoClickTriggerRef = ref(null);
const insideCartClickTriggerRef = ref(null);

const cart = cartStore();
const auth = authStore();
// @computeds

// @methods

const handleToggleSearch = () => {
  isShowSearchInput.value = !isShowSearchInput.value;
};
const handleScroll = () => {
  if (window.scrollY >= topNavRef.value.offsetHeight) {
    mainNavRef.value.classList.add("scrollEffect");
    mainNavRef.value.classList.remove("px-28");
  } else {
    mainNavRef.value.classList.remove("scrollEffect");
    mainNavRef.value.classList.add("px-28");
  }
  if (window.scrollY >= 500) {
    isShowCartList.value = false;
  }
};
const toggleInfoDropdown = () => {
  isShowInfoDropdown.value = !isShowInfoDropdown.value;
};

const toggleCartList = () => {
  isShowCartList.value = !isShowCartList.value;
};

const handleClickOutsideInfo = [
  () => {
    isShowInfoDropdown.value = false;
  },
  { ignore: [insideInfoClickTriggerRef] },
];
const handleClickOutsideCartList = [
  () => {
    isShowCartList.value = false;
  },
  { ignore: [insideCartClickTriggerRef] },
];

const onLogout = async () => {
  await auth.logout();
  cart.carts = [];
  router.replace("/auth/login");
};

// @life cycle hooks
window.addEventListener("scroll", handleScroll);
cartList.value = cart.carts;
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
<style scoped>
.router-link-active.router-link-exact-active.hover-line {
  color: #ffcb36;
}
.router-link-active.router-link-exact-active.hover-line {
  position: relative;
}
.router-link-active.router-link-exact-active.hover-line::before {
  content: "";
  position: absolute;
  width: 60%;
  height: 4px;
  border-radius: 2px;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: #ffcb36;
}
</style>
