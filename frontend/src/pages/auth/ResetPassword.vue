<script setup>
import { ref } from 'vue';
import { Field, Form, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

import { authStore } from '../../stores/auth';
import { useRoute } from "vue-router";
import { errorMessage } from '../../utils/validation'
import router from '../../routes/routes';

const auth = authStore()
const isError = ref(false)

const schema = yup.object({
  password: yup.string().required(errorMessage.requirePassword).min(6, errorMessage.minPassword),
  cfPassword: yup.string().required(errorMessage.requirePassword).min(6, errorMessage.minPassword).oneOf([yup.ref('password'), null], errorMessage.passwordMatch),
})
const { reset_token } = useRoute().params
const resetPassword = async (value) => {
  await auth.resetPassword(value, reset_token)
  if (auth.errorMessage) {
    isError.value = true
  } else {
    isError.value = false
    alert("thanh cong")
    auth.authUser = {}
    router.push('/auth/login')
  }
}

</script>
<template>
  <div class="my-10">
    <div className="px-6 w-1/2 mx-auto">
      <h3 className="my-2 text-center">Reset password</h3>
      <div>
        <Form action="" className="flex flex-col mt-5" @submit="resetPassword" :validationSchema="schema">
          <label htmlFor="" className="mt-1">
            Mật khẩu
          </label>
          <Field name="password" type="password" placeholder="Nhập mật khẩu"
            className="mt-1 border outline-none px-3 h-10 rounded-md" autocomplete="on" />
          <ErrorMessage class="text-red-500" name="password" />
          <label htmlFor="" className="mt-1">
            Nhập lại mật khẩu
          </label>
          <Field name="cfPassword" type="password" autocomplete="off" placeholder="Xác nhận mật khẩu"
            className="mt-1 border outline-none px-3 h-10 rounded-md" />
          <ErrorMessage class="text-red-500" name="cfPassword" />

          <span v-show="isError" class="text-red-500">{{ auth.errorMessage }}</span>
          <button type="submit" className="mt-5 bg-red-500 w-max px-4 py-1 text-white rounded">
            Cập nhật mật khẩu
          </button>


          <p className="mt-5">
            Đã có tài khoản? <router-link to="/auth/login" className="text-blue-500 cursor-pointer">đăng
              nhập</router-link> ngay
          </p>
        </form>
      </div>
    </div>
  </div>
</template>
<style></style>