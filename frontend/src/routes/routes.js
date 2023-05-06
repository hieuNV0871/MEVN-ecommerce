import * as VueRouter from "vue-router";

import config from "../configs/config";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import EmptyLayout from "../layouts/EmptyLayout.vue";
import UserLayout from "../layouts/UserLayout.vue";
import { authStore } from "../stores/auth";

const routes = [
  {
    path: config.route.home,
    component: () => import("../pages/Home.vue"),
    meta: {
      layout: DefaultLayout,
      title: "trang chủ",
    },
  },
  {
    path: config.route.products,
    component: () => import("../pages/Products.vue"),
    meta: {
      layout: DefaultLayout,
      title: "sản phẩm",
    },
  },
  {
    path: config.route.cart,
    component: () => import("../pages/Cart.vue"),
    meta: {
      layout: DefaultLayout,
      requireAuth: true,
      title: "giỏ hàng",
    },
  },
  {
    path: config.route.user,
    component: () => import("../pages/user/index.vue"),
    meta: {
      layout: UserLayout,
      requireAuth: true,
      title: "thông tin tài khoản",
    },
    children: [
      {
        path: "",
        alias: "info",
        component: () => import("../pages/user/Info.vue"),
        meta: {
          title: "thông tin tài khoản",
      },
      },
      {
        path: "bill",
        component: () => import("../pages/user/Bill.vue"),
        meta: {
          title: "theo dõi đơn hàng",
      },
      },
      {
        path: "change-pass",
        component: () => import("../pages/user/ChangePass.vue"),
        meta: {
          title: "đổi mật khẩu",
      },
      },
    ],
  },
  {
    path: config.route.auth,
    component: () => import("../pages/auth/Auth.vue"),
    meta: {
      layout: DefaultLayout,
      title: "đăng nhập",
    },
    beforeEnter: (to, from, next) => {
      if (to.fullPath === "/auth") {
        next("/auth/login");
      } else {
        next();
      }
    },

    children: [
      {
        path: "",
        alias: "login",
        meta: {
            title: "đăng nhập",
        },
        component: () => import("../pages/auth/Login.vue"),
      },
      {
        path: "signup",
        component: () => import("../pages/auth/Register.vue"),
        meta: {
          title: "đăng ký",
      },
      },
      {
        path: "forgot",
        component: () => import("../pages/auth/ForgotPassword.vue"),
        meta: {
          title: "quên mật khẩu",
      },
      },
      {
        path: "activate/v1/:active_token",
        component: () => import("../pages/auth/ActiveEmail.vue"),
        meta: {
          title: "kích hoạt tài khoản",
      },
      },
      {
        path: "reset_password/v1/:reset_token",
        component: () => import("../pages/auth/ResetPassword.vue"),
        meta: {
          title: "cấp lại mật khẩu",
      },
      },
    ],
  },
  {
    path: config.route.detailProduct,
    component: () => import("../pages/DetailProduct.vue"),
    meta: {
      layout: DefaultLayout,
      title: "chi tiết sản phẩm",
    },
  },
  {
    path: config.route.news,
    component: () => import("../pages/News.vue"),
    meta: {
      layout: DefaultLayout,
      title: "tin tức",
    },
  },
  {
    path: config.route.admin, //'/ADMIN'
    component: () => import("../pages/admin/index.vue"), // <router-view> </router-view>
    meta: {
      title: "admin control panel",
      layout: DefaultLayout,
      requireAuth: true,
      requiredAuthAdmin: true,
    },
  },
  {
    path: config.route.pageNotFound,
    component: () => import("../pages/404NotFound.vue"),
    meta: {
      layout: EmptyLayout,
      title: "ops!, trang không tồn tại",
    },
  },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `NVH - ${to.meta.title}`  || "NVH-SHOP";
  if (!to.meta.requireAuth) {
    return next();
  }

  const auth = authStore();

  if (!auth.authUser.username) {
    return next("/auth/login");
  }

  if (to.meta.requiredAuthAdmin && !auth.authUser.isAdmin) {
    return next("/auth/login");
  }
  return next();
});



export default router;
