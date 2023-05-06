<template>
    <div>
        <Form action="" @submit="handleChangePass" :validation-schema="schema" class="w-1/3">
            <div class="flex flex-col gap-x-2">
                <label for="oldPassword">Mat khau hien tai:</label>
                <Field type="password" autocomplete="on"  class="mt-2 border outline-none px-3 h-10 rounded-md"  name="oldPassword" id="oldPass"/>
                <ErrorMessage name="oldPassword" class="text-red-500" />
            </div>
            <div class="flex flex-col gap-x-2">
                <label for="password">Mat khau moi:</label>
                <Field type="password" autocomplete="on" class="mt-2 border outline-none px-3 h-10 rounded-md" name="password" id="pass"/>
                <ErrorMessage name="password" class="text-red-500" />
            </div>
            <div class="flex flex-col gap-x-2">
                <label for="cfPassword">Xac nhan mat khau:</label>
                <Field type="password" autocomplete="on" class="mt-2 border outline-none px-3 h-10 rounded-md" name="cfPassword" id="cfPass"/>
                <ErrorMessage name="cfPassword" class="text-red-500" />
            </div>
            <span v-if="errorMsg" class="text-red-500">{{ errorMsg }}</span>
            <div>
                <button class="mt-5 bg-red-500 w-max px-4 py-1 text-white rounded" type="submit">submit</button>
            </div>
        </Form>
    </div>
</template>
<script setup>
    import { ref } from 'vue';
    import { Form, Field, ErrorMessage } from 'vee-validate';
    import * as yup from "yup";
    import { errorMessage } from "../../utils/validation";
    import { authStore } from '../../stores/auth';

    const schema = yup.object({
        oldPassword: yup.string().required(errorMessage.requirePassword).min(6, errorMessage.minPassword),
        password: yup.string().required(errorMessage.requirePassword).min(6, errorMessage.minPassword),
        cfPassword: yup.string().required(errorMessage.requirePassword).min(6, errorMessage.minPassword).oneOf([yup.ref('password'), null], errorMessage.passwordMatch),
});
    const auth = authStore()
    const errorMsg = ref('')
    const handleChangePass = async (value) => {
       await auth.changePass(value)
       if(auth.errorMessage){
        errorMsg.value = auth.errorMessage
       }else{
        errorMsg.value = ''
        value = ''
       }
       
    }
</script>
<style>
    
</style>