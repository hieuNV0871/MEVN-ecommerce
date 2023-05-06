<script setup>
import { ref } from 'vue';
import { Field, Form, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

import { authStore } from '../../stores/auth';
import router from '../../routes/routes';
import {errorMessage} from '../../utils/validation'
import {LeftOutlined} from '@ant-design/icons-vue'
const auth = authStore()
const isError  = ref(false)

const schema = yup.object({
  email: yup.string().required(errorMessage.requireEmail).email(errorMessage.isEmail),

})
const onBack = () => {
  router.go(-1)
}
const onForgotPass = async (value) => {
  await auth.forgotPass(value)
  if(auth.errorMessage){
    isError.value = true
  }else {
    isError.value = false
    alert('check your mail')
  }
  
}
</script>

<template>
  <div class="flex justify-center items-center">
    <div class="my-10 relative">
      <div @click="onBack" class='absolute cursor-pointer top-[15px] p-1'>
        <LeftOutlined/>
        <!-- <Icon icon="ic:baseline-keyboard-arrow-left" width="30" height="30"
          class="w-6 h-6 text-black/30 hover:text-black" /> -->
        <!-- <ChevronLeftIcon /> -->
      </div>
      <h3 class="my-5 text-center">Quên mật khẩu</h3>
      <div>
        <Form action="" class="flex flex-col mt-7" @submit="onForgotPass" :validationSchema="schema">
          <label htmlFor="">Email</label>
          <Field  type="email" placeholder="Nhập tài khoản email"
            class="mt-2 border outline-none px-3 h-10 rounded-md" name="email" />
            <ErrorMessage name="email" class="text-red-500"/>
            <span v-show="isError" class="text-red-500">{{ auth.errorMessage }}</span>
          <div class="flex items-center justify-between">
            <button type="submit" class="mt-5 bg-red-500 w-max px-4 py-1 text-white rounded">
              Gửi mail xác nhận
            </button>
          </div>
          <p class="mt-5">
            Chưa có tài khoản? <router-link class="text-blue-500 cursor-pointer" to="/auth/signup">đăng ký</router-link>
            tại đây
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<style></style>