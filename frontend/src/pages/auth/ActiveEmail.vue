<script setup>
import { useRoute } from "vue-router";

import { authStore } from '../../stores/auth';


const activeEmail = async () => {
    const auth = authStore()
    const { active_token } = useRoute().params
    await auth.activation(active_token)
    if(auth.errorMessage){
        alert(auth.errorMessage)
    }else{
        alert("thanh cong")
    }
}
activeEmail()

</script>
<template>
    <div>
        activated
    </div>
</template>
<style></style>