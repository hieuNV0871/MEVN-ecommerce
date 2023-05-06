import { ref, computed, watch } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import request from "../utils/request";

export const cartStore = defineStore("cart", () => {
  
    const carts = useLocalStorage("Cart", [])
    const addToCart = async (cart) => {
        const res = await request.post("user/add_to_cart", cart )
        carts.value = res.data.data

    }
    const updateCartItem = async (cart) => {
      await request.patch("user/update_cart_item", {cart})
    }

    const removeCartItem = async (id) => {
      await request.delete(`user/delete_from_cart/${id}`)
    }
    const getCarts = async() => {
      const res = await request.get("user/info")
      carts.value = res.data.data.cart
    }

     
  return {
    carts,
    addToCart,
    getCarts,
    updateCartItem,
    removeCartItem

  };
});
