<template>
  <div class="mx-20 my-10 flex gap-x-5 px-20">
    <div class="w-1/4 flex flex-col gap-y-3 p-2 bg-dark-gray rounded">
      <span
        >Bạn đang có
        <span class="text-primary">{{ cart.carts.length }} </span> sản phẩm
        trong giỏ hàng</span
      >
      <span
        >Thành tiền:
        <span class="text-primary">{{ getTotalPrice.toLocaleString() }} đ</span></span
      >
      <div class="flex flex-col gap-y-2 items-center">
        <button class="btn btn-outline-effect" @click = "isShowCheckoutModal = true">
          <span>Đặt hàng ngay</span><i></i>
        </button>
        <router-link class="btn btn-outline-effect" to="/"
          ><span> Tiếp tục mua hàng </span><i></i
        ></router-link>
      </div>
    </div>
    <div
      class="w-3/4 flex flex-col gap-y-3 p-2 bg-dark-gray rounded justify-center"
    >
      <div
        v-if="cart.carts.length"
        v-for="(item, index) in cart.carts"
        :key="index"
        class="flex gap-x-5 justify-between items-center"
      >
        <div>
          <img
            :src="item.image"
            alt=""
            class="w-[50px] h-[50px] object-cover rounded"
          />
        </div>
        <div>
          {{ item.name }}
        </div>
        <div
          class="relative cursor-pointer select-none flex justify-center items-center gap-x-2"
        >
          <div @click="handleToggleProductTypePopper(index)">
            <span>Phân loại</span>
            <CaretDownOutlined
              :style="{ fontSize: '16px' }"
              :rotate="__index === index ? 180 : 0"
            />
          </div>

          <ProductTypePopper
            v-if="__index === index"
            class="absolute top-[25px] right-[50px] text-black px-2 z-[999] min-w-[220px]"
          >
            <div>
                <div class="flex flex-col gap-y-2">
                  <h4>Màu sắc:</h4>
                  <div class="flex  gap-x-2 ">
                    <label
                      v-for="(c, index) in item.availableColors"
                      :key="index"
                      :class="c === color  ? 'border-primary' : ''"
                      class="color-option btn inline-block border cursor-pointer hover:border-primary"
                      :for="c"
                      @change="handleChooseColor(item._id)"
                    >
                    <input
                        type="radio"
                        :id="c"
                        v-model="color"
                        name="color"
                        :value="c"
                        class="hidden"
                      />
                        {{ c }}
                    </label>
                  </div>
                </div>
                <div class="my-5 flex flex-col gap-y-2">
          <h4>Kích cỡ:</h4>
                  <div class="flex gap-x-2">
                    <label
                      v-for="(s, index) in item.uniqueSizes"
                      :key="index"
                      :class="s === size ? 'border-primary ' : ''"
                      class="border  btn inline-block"
                      v-bind:class="
                        disableSizes.includes(s) || !color //css
                          ? 'opacity-50 cursor-not-allowed  hover:border-gray-200'
                          : ' hover:border-primary'
                      "
                      :for="s"
                    >
                      <input
                        type="radio"
                        :id="s"
                        v-model="size"
                        name="size"
                        :value="s"
                        class="hidden"
                        @change="handleChooseSize"
                        :disabled="disableSizes.includes(s) || !color"
                        
                      />
                      {{ s }}
                    </label>
                  </div>
        </div>
              </div>
            <div class="flex justify-between">
              <button
                @click="handleCancelType"
                class="btn border hover:border-black "
              >
                Hủy
              </button>
              <button
                @click="handleUpdateCartItem(item._id)"
                class="btn border border-primary hover:bg-primary hover:border-black"
              >
                Xác nhận
              </button>
            </div>
          </ProductTypePopper>


          <span class="text-primary">{{ item.color }} -</span>
          <span class="text-primary">{{ item.size }}</span>
        </div>
        <div>{{ (item.price * item.quantity).toLocaleString() }} đ</div>
        <div class="flex gap-x-2 items-center">
          <button class="btn btn-outline-effect min-w-[40px]" @click="handleChangeQuantity(item._id, 'subtract')">
            <span class="px-1">-</span><i></i>
          </button>
          <input
          @input="handleValidateQuantity(item._id)"
            type="text"
            class="rounded flex text-center max-w-[50px] outline-none"
            v-model="item.quantity"
          />
          <button class="btn btn-outline-effect min-w-[40px]" @click="handleChangeQuantity(item._id, 'plus')">
            <span class="px-1">+</span><i></i>
          </button>
        </div>
        <div
          @click="handleDeleteItemFromCart(item._id)"
          class="cursor-pointer flex justify-center items-center hover:text-primary"
        >
          <DeleteOutlined :style="{ fontSize: '24px' }" />
        </div>
      </div>
      <div
        v-else
        class="text-center flex items-center justify-center flex-col gap-y-4"
      >
        <span>Ops! Không có sản phẩm nào trong giỏ hàng</span>
        <router-link to="/" class="btn btn-fill-effect"
          >Mua sắm ngay</router-link
        >
      </div>
    </div>
    <div>
      <Modal v-if="isShowCheckoutModal"   @close="isShowCheckoutModal = false">
          <template #header>
              Đơn đặt hàng
          </template>
          <template #content>
            <Form action="" class="flex flex-col gap-y-2 w-full min-w-[450px]" :validation-schema="schema" @submit="handleCreateBill">
              <div class="flex gap-y-2 flex-col">
                <label for="" class="">Họ tên người nhận:</label>
                <Field name="name" class=" border outline-none h-8 px-3 rounded-lg focus:border-primary" type="text" placeholder="Họ tên"/>
                <ErrorMessage name="name" class="text-red-500" />
              </div>
              <div class="flex gap-y-2 flex-col">
                <label for="" class="">Số điện thoại:</label>
                <Field name="phone" class=" border outline-none h-8 px-3 rounded-lg focus:border-primary" type="text" placeholder="Số điện thoại"/>
                <ErrorMessage name="phone" class="text-red-500" />
              </div>
              <div class="flex gap-y-2 flex-col">
                <label for="" class="">Địa chỉ:</label>
                <Field name="address" class=" border outline-none h-8 px-3 rounded-lg focus:border-primary" type="text" placeholder="Địa chỉ"/>
                <ErrorMessage name="address" class="text-red-500" />
              </div>
              <div class="flex flex-col gap-y-2">
                <label for="" class="">Phương thức thanh toán:</label>
                <select
                    id=""
                    name="paymentMethods"
                    v-model="paymentMethod"
                    class=" border outline-none h-8 px-3 rounded-lg"
                    @change="handleSelectedPaymentMethod"
                >
                    <option value="cash">Thanh toán khi nhận hàng</option>
                    <option value="momo">Momo e-wallet</option>
          </select>
              </div>
              <div>
                <span>
                  Đơn mua:
                </span>
              </div>
              <span>
                Thành tiền: <span class="font-semibold">{{ getTotalPrice.toLocaleString() }} đ</span>
              </span>
              <div>
                <button class="btn btn-fill-effect" type="submit">
                    Xác nhận
                </button> 
              </div>
            </Form>
          </template>
         
      </Modal>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { cartStore } from "../stores/cart";
import { Wrapper as ProductTypePopper } from "../components/Popper/popper";
import { DeleteOutlined, CaretDownOutlined } from "@ant-design/icons-vue";
import { vOnClickOutside } from "@vueuse/components";
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { errorMessage } from "../utils/validation";
import request from "../utils/request";
import Modal from "../components/Modal.vue";
import { authStore } from "../stores/auth";
import router from "../routes/routes";
const auth = authStore()
const cart = cartStore();
const phoneRegExp = /^(\+?\d{1,3}[- ]?)?\d{10}$/;
const schema = yup.object({
  name: yup
    .string()
    .required(errorMessage.require),
  phone: yup
    .string()
    .matches(phoneRegExp, errorMessage.isPhone)
    .required(errorMessage.require),
  address: yup.string().required(errorMessage.require)
});
// @reactive variables
const __index = ref(-1)
const isShowCheckoutModal = ref(false)
const paymentMethod = ref('cash')
// const quantity = ref(1);
const color = ref('')
const size = ref('')
const disableSizes = ref([])
const errorMsg = ref('')
// @computeds

const getTotalPrice = computed(() => {
  return cart.carts
    .reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0)
});


// @methods

const handleToggleProductTypePopper = (index) => {
  color.value = ''
  if(__index.value !== index){
    __index.value = index
  }else{
    __index.value = -1
  }
};
const handleCancelType = ()=> {
  color.value = ''
  size.value = ''
  __index.value = -1

}

const handleChooseColor = (id)=>{
  const cartProduct = cart.carts.find(item=>item._id === id)
  size.value = ''
  const colorTmp = cartProduct.detailProduct.colors.find((c) => c.name === color.value);
  if (!colorTmp) {
    return [];
  }
  const colorSizes = colorTmp.sizes.map((s) => s.name);
  const result = cartProduct.uniqueSizes.filter((item) => !colorSizes.includes(item));
  const sizeWithZeroQuantity = colorTmp.sizes.reduce((acc, color) => {
    if (color.quantity === 0) {
      acc.push(color.name);
    }
    return acc;
  }, []);
  if(color.value === cartProduct.color){
    disableSizes.value = [...result, ...sizeWithZeroQuantity, cartProduct.size]
  }else{
    disableSizes.value = [...result, ...sizeWithZeroQuantity];
  }
  console.log(disableSizes);

}

const handleChooseSize = ()=> {
  
}

const handleValidateQuantity = async (id) => {
  const cartProduct = cart.carts.find(item=>item._id === id)
  const regex = /^[0-9]+$/;
  if (!regex.test(cartProduct.quantity) || cartProduct.quantity < 1) {
    cartProduct.quantity = 1;
    
  }

  if ( cartProduct.quantity  >= cartProduct.maxQuantity) {
    // errorMsg.value = 'Bạn đã chọn tối đa số sản phẩm hiện có'
    cartProduct.quantity = cartProduct.maxQuantity
  }
  const cartItem = {
    __id: cartProduct._id,
    quantity: cartProduct.quantity
  }
  await cart.updateCartItem(cartItem)
};

const handleChangeQuantity = async(id, type) => {
  const cartProduct = cart.carts.find(item=>item._id === id)
  const isPlus = type === "plus";
  const isSubtract = type === "subtract";

  if (
    (isPlus && cartProduct.quantity  >= cartProduct.maxQuantity) ||
    (isSubtract && cartProduct.quantity <= 1)
  ) {
    // errorMsg.value = 'Bạn đã chọn tối đa số sản phẩm hiện có'
    return;
  }
  cartProduct.quantity = isPlus ? cartProduct.quantity + 1 : cartProduct.quantity - 1;
  const cartItem = {
    __id: cartProduct._id,
    quantity: cartProduct.quantity
  }
  await cart.updateCartItem(cartItem)
};

const handleSelectedPaymentMethod = ()=> {
  if(paymentMethod.value === 'momo'){
    console.log("momoo");
  }
}

const handleCreateBill = async(value)=> {
  value.order = cart.carts
  value.userId = auth.userq._id
  value.totalPrice = getTotalPrice.value
  value.paymentMethod = paymentMethod.value
  if(!value.order || value.totalPrice <= 0 ) {
    return
  }
  await request.post("bill/create", value)
  await cart.getCarts()
  isShowCheckoutModal.value = false
  router.push("/user/bill")
}

const handleUpdateCartItem = async (id) => {


  const cartProduct = cart.carts.find(item=>item._id === id)
  const price = color.value ? cartProduct.detailProduct.colors.find(c => c.name === color.value).price : 0
  const maxQuantity = color.value && size.value ? cartProduct.detailProduct.colors.find(c => c.name === color.value).sizes.find(s => s.name === size.value).quantity : 0;
  const cartItem = {
    __id: cartProduct._id,
    _id: `${cartProduct.productId}${size.value}${color.value}`,
    productId: cartProduct.productId,
    name: cartProduct.name,
    price,
    quantity: 1,
    size: size.value,
    color: color.value,
    image: cartProduct.detailProduct.images[0].src,
    uniqueSizes: cartProduct.uniqueSizes,
    maxQuantity,
    availableColors: cartProduct.availableColors,
    detailProduct: cartProduct.detailProduct
  };
  if(disableSizes.value.includes(cartItem.size)){
    cartItem.size = ''
  }
  if(!cartItem.size || !cartItem.color){
    errorMsg.value = 'Vui lòng chọn đầy đủ thông tin'
    alert(errorMsg.value)
    return 
  }else{
    errorMsg.value = ''
  }
  await cart.updateCartItem(cartItem);
  __index.value = -1
  await cart.getCarts()
};
const handleDeleteItemFromCart = async (id) => {
  const cf = confirm("xoa ?");
  if (cf) {
    await cart.removeCartItem(id);
    await cart.getCarts();
  }
};
// licycle hooks
watch(isShowCheckoutModal, ()=>{
  isShowCheckoutModal.value ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'auto'

})
  
</script>
<style>

.modal-fade-enter-active {
  transition: opacity 0.2s ease-out;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}</style>
