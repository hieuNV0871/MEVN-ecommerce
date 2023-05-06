<template>
    <div >
        <Header/>
        <div  class="mx-20 my-10 flex justify-between gap-x-10">
            <nav class="user-nav flex flex-col  gap-y-2">
                <router-link class=" w-full px-2 py-1 hover:bg-dark-text hover:text-black rounded" to="/user/info">
                    Thông tin cá nhân
                </router-link>
                <router-link class="w-full px-2 py-1 hover:bg-dark-text hover:text-black rounded" to="/user/bill">
                    Kiểm tra đơn hàng
                </router-link>
                <router-link class="w-full px-2 py-1 hover:bg-dark-text hover:text-black rounded " to="/user/change-pass">
                    Đổi mật khẩu
                </router-link>
            </nav>
            <div class="flex-1">
                <slot/>
            </div>
        </div>
        <Footer/>
    </div>
</template>
<script setup>
    import Header from './components/Header.vue';
    import Footer from './components/Footer.vue';
</script>
<style scoped>
    .user-nav .router-link-active.router-link-exact-active{
        background-color: #cbd5e1;
        color: black;
    }
</style>