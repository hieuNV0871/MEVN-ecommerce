<script setup>
import { ref } from 'vue';
import { Field, Form, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { decodeCredential } from 'vue3-google-login'

import { authStore } from '../../stores/auth'
import { cartStore } from '../../stores/cart'

import router from '../../routes/routes';
import { errorMessage } from '../../utils/validation'


const auth = authStore()
const cart = cartStore()
const isError = ref(false)


const schema = yup.object({
  username: yup.string().required(errorMessage.requireUsername).min(6, errorMessage.minUsername),
  password: yup.string().required(errorMessage.requirePassword).min(6, errorMessage.minPassword)
})
const googleLogin = async (response) => {
  // decodeCredential will retrive the JWT payload from the credential
  console.log(response.credential);
  await auth.loginGoogle(response.credential)
  if (auth.authUser.isAdmin) {
    router.push('/admin')
  } else if (auth.authUser.isAdmin === false) {
    router.push('/')
  } else {
    isError.value = true
    return 0
  }
  await cart.getCarts()

}


const onLogin = async (value) => {
  await auth.login(value)
  // await auth.getToken()
  if (auth.authUser.isAdmin) {
    router.push('/admin')
  } else if (auth.authUser.isAdmin === false) {
    router.push('/')
  } else {
    isError.value = true
    console.log(auth.errorMessage);
    return 0
  }
  await cart.getCarts()
}





const handleChange = () => {
  isError.value = false
}
</script>
<template>
  <div class="flex justify-center items-center">

    <div class="my-10">
      <h3 class="my-5 text-center">Đăng nhập</h3>
      <div>
        <Form action="" class="flex flex-col mt-7 px-6 w-[400px]" @submit="onLogin" :validationSchema="schema">
          <label htmlFor="">Tài khoản</label>
          <Field type="text" placeholder="Nhập tài khoản hoặc email" class="mt-2 border outline-none px-3 h-10 rounded-md"
            name="username" @change="handleChange" />
          <ErrorMessage name="username" class="text-red-500" />
          <label htmlFor="" class="mt-5">
            Mật khẩu
          </label>
          <Field type="password" placeholder="Nhập mật khẩu" autocomplete="on"
            class="mt-2 border outline-none px-3 h-10 rounded-md" name="password" @change="handleChange" />
          <ErrorMessage name="password" class="text-red-500" />
          <span v-show="isError" class="text-red-500">{{ auth.errorMessage }}</span>
          <div class="flex items-center justify-between">
            <button type="submit" class="mt-5 bg-red-500 w-max px-4 py-1 text-white rounded">
              Đăng nhập
            </button>
            <router-link to="/auth/forgot" class="hover:text-blue-500">
              Quên mật khẩu ?
            </router-link>


          </div>
          <div class="mt-4">
            <h3 class="text-sm font-thin mb-3">Hoặc đăng nhập với: </h3>
            <!-- google login -->
            <GoogleLogin :callback="googleLogin" />

          </div>
          <p class="mt-5">
            Chưa có tài khoản?
            <router-link class="text-blue-500 cursor-pointer" to="/auth/signup">
              đăng ký
            </router-link>
            tại đây
          </p>
        </Form>
      </div>
    </div>
  </div>
</template>
<style></style>