<script setup>
import { useRoute } from "vue-router";
import { ref, computed } from "vue";

import request from "../utils/request";
import { cartStore } from "../stores/cart";

const cart = cartStore();
const route = useRoute();
const productSlug = route.params.name;

const product = ref();
const activeImage = ref(0);
const price = ref(0);
const originPrice = ref(0);
const productCount = ref(0);

const color = ref("");
const size = ref("");
const quantity = ref();
const disableSize = ref([]);
const errorMsg = ref('')


const uniqueSizes = computed(() => {
  let uniqueSizes = [];
  for (const color of product.value.colors) {
    for (const size of color.sizes) {
      if (!uniqueSizes.includes(size.name)) {
        uniqueSizes.push(size.name);
      }
    }
  }
  return uniqueSizes;
});
const totalQuantity = computed(() => {
  let sum = 0;
  product.value.colors.forEach((color) => {
    color.sizes.forEach((size) => {
      sum += size.quantity;
    });
  });
  return sum;
});

const getRangePriceDefault = computed(() => {
  const prices = product.value.colors.map((color) => color.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const formattedMinPrice = minPrice.toLocaleString();
  const formattedMaxPrice = maxPrice.toLocaleString();

  return `${formattedMinPrice} - ${formattedMaxPrice}`;
});


const getProduct = async () => {
  const res = await request.get(`product/get_product_by_slug/${productSlug}`);
  product.value = res.data.data;
  // default selected when component mounted
  // price.value = res.data.data.colors[0].price
  // originPrice.value = res.data.data.colors[0].originPrice
  // color.value = res.data.data.colors[0].name
  // const availableSizeInit = res.data.data.colors[0].sizes.find(size => size.quantity > 0)
  // size.value = availableSizeInit.name
  productCount.value = totalQuantity.value;
  quantity.value = 1;
};

getProduct();
const handleActiveImage = (index) => {
  activeImage.value = index;
};

const handleChooseColor = () => {
  errorMsg.value = ''
  size.value = ''
  productCount.value = totalQuantity.value
  const colorTmp = product.value.colors.find((c) => c.name === color.value);
  if (!colorTmp) {
    return [];
  }
  price.value = colorTmp.price;
  originPrice.value = colorTmp.originPrice;
  const colorSizes = colorTmp.sizes.map((s) => s.name);

  const result = uniqueSizes.value.filter((item) => !colorSizes.includes(item));

  const sizeWithZeroQuantity = colorTmp.sizes.reduce((acc, color) => {
    if (color.quantity === 0) {
      acc.push(color.name);
    }
    return acc;
  }, []);

  disableSize.value = [...result, ...sizeWithZeroQuantity];
};

const handleChooseSize = () => {
  errorMsg.value = ''
  const colorsTmp = product.value.colors.find(
    (colorTmp) => colorTmp.name === color.value
  );
  const sizesTmp = colorsTmp.sizes.find(
    (sizeTmp) => sizeTmp.name === size.value
  );
  productCount.value = sizesTmp.quantity;
  quantity.value = 1
};

const handleValidateQuantity = () => {
  const regex = /^[0-9]+$/;
  if (!regex.test(quantity.value) || quantity.value < 1) {
    quantity.value = 1;
  }
  const item = cart.carts.find((i) => i.productId === product.value._id && i.color === color.value && i.size === size.value);
  const currentCartQuantity = item ? item.quantity : 0
  if ( quantity.value + currentCartQuantity >= productCount.value) {
    // errorMsg.value = 'Bạn đã chọn tối đa số sản phẩm hiện có'
    quantity.value = productCount.value - currentCartQuantity;
  }else{
    errorMsg.value = ''

  }
};
const handleChangeQuantity = (type) => {
  const isPlus = type === "plus";
  const isSubtract = type === "subtract";
  const item = cart.carts.find((i) => i.productId === product.value._id && i.color === color.value && i.size === size.value);
  const currentCartQuantity = item ? item.quantity : 0
  if (
    (isPlus && quantity.value + currentCartQuantity >= productCount.value) ||
    (isSubtract && quantity.value <= 1)
  ) {
    // errorMsg.value = 'Bạn đã chọn tối đa số sản phẩm hiện có'
    return;
  }else{
    errorMsg.value = ''

  }

  quantity.value = isPlus ? quantity.value + 1 : quantity.value - 1;
};

const handleAddToCart = async () => {
  const availableColors = product.value.colors.map((color) => color.name);
  // const availableSizes = product.value.colors.find((c) => c.name === color.value).sizes.filter(size => size.quantity > 0).map(size => size.name)
  const value = {
    _id: `${product.value._id}${size.value}${color.value}`,
    productId: product.value._id,
    slug: product.value.slug,
    name: product.value.name,
    price: price.value,
    quantity: Number(quantity.value),
    size: size.value,
    color: color.value,
    image: product.value.images[0].src,
    uniqueSizes: uniqueSizes.value,
    maxQuantity: productCount.value,
    availableColors,
    detailProduct: product.value

  };
  // console.log(value);
  // console.log(value.availableSizes);
  // console.log(value.availableColors);

  if(disableSize.value.includes(value.size)){
    value.size = ''
  }
  const item = cart.carts.find((i) => i.productId === product.value._id && i.color === color.value && i.size === size.value);
  const currentCartQuantity = item ? item.quantity : 0
  // console.log(currentCartQuantity + value.quantity);
  if(value.quantity + currentCartQuantity > productCount.value) {
    errorMsg.value = 'Bạn đã chọn tối đa số sản phẩm hiện có'
    return
  }else{
    errorMsg.value = ''

  }
  if(!value.size || !value.color ||!value.quantity){
    errorMsg.value = 'Vui lòng chọn đầy đủ thông tin'
    return 
  }else{
    errorMsg.value = ''
  }
  await cart.addToCart(value);
};


</script>
<template>
  <div v-if="product" class="mx-20 my-10">
    <div class="flex gap-x-5">
      <!-- begin images section -->
      <div class="flex-1 w-1/2 flex gap-x-10">
        <div class="flex flex-col gap-y-2">
          <div
            v-for="(image, index) in product.images"
            :key="index"
            @click="handleActiveImage(index)"
          >
            <img
              :src="image.src"
              alt=""
              :class="
                activeImage === index
                  ? ' border-red-500 border-2'
                  : ' border-red-200 border'
              "
              class="w-28 h-24 object-cover cursor-pointer p-1"
            />
          </div>
        </div>
        <div>
          <div>
            <img
              :src="product.images[activeImage].src"
              alt=""
              class="w-[400px] h-[400px] object-cover cursor-pointer"
            />
          </div>
        </div>
      </div>
      <!-- end images section -->

      <!-- begin actions section -->
      <div class="flex-1 w-1/2 flex flex-col gap-y-3">
        <div>
          <h3 class="font-semibold text-xl">{{ product.name }}</h3>
        </div>
        <div class="flex gap-x-4" v-if="price">
          <span>{{ price.toLocaleString() }} đ</span>
          <span v-if="originPrice" class="line-through"
            >{{ originPrice.toLocaleString() }} đ</span
          >
          <span v-if="originPrice" class="text-red-500"
            >{{
              0 - Math.floor(((originPrice - price) / originPrice) * 100)
            }}%</span
          >
        </div>
        <div v-else>
          {{ getRangePriceDefault }} đ
        </div>
        <div>
          <h4 class="mb-2">Màu sắc:</h4>
          <label
            v-for="(item, index) in product.colors"
            :key="index"
            :class="item.name === color ? 'border-primary' : ''"
            class="color-option mr-5 btn inline-block border cursor-pointer hover:border-primary"
            :for="item.name"
            @change="handleChooseColor"
          >
            <input
              type="radio"
              :id="item.name"
              v-model="color"
              name="color"
              :value="item.name"
              class="hidden"
            />
            {{ item.name }}
          </label>
        </div>
        <div>
          <h4>Kích cỡ:</h4>

          <label
            v-for="(item, index) in uniqueSizes"
            :key="index"
            v-bind:class="item === size ? 'border-primary' : ''"
            class="color-option mr-5 btn inline-block border  "
            :class="
              disableSize.includes(item) || !color //css
              ? 'opacity-50 cursor-not-allowed  border hover:border-gray-200'
                : 'hover:border-primary cursor-pointer'
            "
            :for="item"
          >
            <input
              type="radio"
              :id="item"
              v-model="size"
              name="size"
              :value="item"
              class="hidden"
              @change="handleChooseSize"
              :disabled="disableSize.includes(item) || !color"
            />
            {{ item }}
          </label>
        </div>
        <div>
          <h4 class="mb-3">Số lượng:</h4>
          <div class="flex gap-x-2 items-center">
            <button
              @click="handleChangeQuantity('subtract')"
              class="btn btn-outline-effect min-w-[40px]"
            >
              <span class="px-1">-</span><i></i>
            </button>
            <input
              @input="handleValidateQuantity"
              type="text"
              v-model="quantity"
              class="rounded flex text-center max-w-[50px] outline-none"
            />
            <button
              @click="handleChangeQuantity('plus')"
              class="btn btn-outline-effect min-w-[40px]"
            >
              <span class="px-1">+</span><i></i>
            </button>
            <span><span class="text-primary mr-2">{{ productCount }}</span>sản phẩm có sẵn</span>
          </div>
        </div>
        <span v-if="errorMsg" class="text-red-500">! {{ errorMsg }}</span>
        <div class="flex mt-5 gap-x-4">
          <button @click="handleAddToCart" class="btn btn-fill-effect">
            Thêm vào giỏ hàng
          </button>
          <button class="btn btn-fill-effect">Mua ngay</button>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-2">Chi tiết sản phẩm:</h3>
          <div v-html="product.description"></div>
        </div>
      </div>
      <!-- end actions section -->
    </div>
  </div>
</template>
<style></style>
