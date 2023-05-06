<script setup>
import { ref } from 'vue';
import { Field, Form, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

import { authStore } from '../../stores/auth';
import router from '../../routes/routes';
import { errorMessage } from '../../utils/validation'


const isError = ref(false)
const auth = authStore()


const schema = yup.object({
  username: yup.string().required(errorMessage.requireUsername).min(6, errorMessage.minUsername),
  email: yup.string().required(errorMessage.requireEmail).email(errorMessage.isEmail),
  password: yup.string().required(errorMessage.requirePassword).min(6, errorMessage.minPassword),
  cfPassword: yup.string().required(errorMessage.requirePassword).min(6, errorMessage.minPassword).oneOf([yup.ref('password'), null], errorMessage.passwordMatch),

})
const onRegister = async (value) => {
  // const user = {username: username.value, password: password.value, email: email.value}
  await auth.register(value)
  // console.log(user);
  alert('check your mail')
  if (!auth.errorMessage) {
    router.push('/auth/login')
  } else {
    isError.value = true
    return 0
  }

}
const handleChange = () => {
  isError.value = false
}
</script>
<template>
  <div class="flex justify-center items-center">
    <div class="my-10">
      <h3 class="my-2 text-center">Đăng ký</h3>
      <div>
        <Form action="" class="flex flex-col mt-5 px-6 w-[400px]" @submit="onRegister" :validationSchema="schema">
          <label htmlFor="">Tài khoản</label>
          <Field type="text" placeholder="Nhập tài khoản" class="mt-1 border outline-none px-3 h-10 rounded-md"
            name="username" />
          <ErrorMessage name="username" class="text-red-500" />
          <label htmlFor="">Email</label>
          <Field name="email" type="text" placeholder="Nhập địa chỉ email"
            class="mt-1 border outline-none px-3 h-10 rounded-md" @change="handleChange" />
          <ErrorMessage name="email" class="text-red-500" />

          <label htmlFor="" class="mt-1">
            Mật khẩu
          </label>
          <Field name="password" autocomplete="on" type="password" placeholder="Nhập mật khẩu"
            class="mt-1 border outline-none px-3 h-10 rounded-md" />
          <ErrorMessage name="password" class="text-red-500" />
          <label htmlFor="" class="mt-1">
            Nhập lại mật khẩu
          </label>
          <Field autocomplete="off" type="password" placeholder="Xác nhận mật khẩu"
            class="mt-1 border outline-none px-3 h-10 rounded-md" name="cfPassword" />
          <ErrorMessage name="cfPassword" class="text-red-500" />
          <span v-show="isError" class="text-red-500">{{ auth.errorMessage }}</span>
          <button type="submit" class="mt-5 bg-red-500 w-max px-4 py-1 text-white rounded">
            Đăng ký
          </button>


          <p class="mt-5">
            Đã có tài khoản? <router-link class="text-blue-500 cursor-pointer" to="/auth/login">đăng nhập</router-link>
            ngay
          </p>
        </Form>
      </div>
    </div>
  </div>
</template>
<style></style>