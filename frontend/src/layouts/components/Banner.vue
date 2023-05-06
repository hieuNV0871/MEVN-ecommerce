<script setup>
        import { computed } from 'vue';
        const props = defineProps({
            banners: Array
        })

        // @computeds 
        const sortBanners = computed(()=>{
           return props.banners.sort((a, b) => a.order - b.order);
        })
   
</script>

<template>
    <section class="md:my-10 my-20 md:mx-20 mx-10">
        <div class="flex justify-between items-center md:gap-x-2 gap-y-2 md:flex-row flex-col">
             <div v-for="(banner, index) in sortBanners" :key="index" class="overflow-hidden rounded md:w-1/3 w-full relative">
                <router-link to="/" class="banner-box relative block">
                    <img :src="banner.src" alt=""  class="banner-image object-cover h-60">
                </router-link>
            </div>
        </div>
    </section>
</template>

<style >
    .banner-image {
        border-radius: 4px;
        width: 100%;
        transition: all 0.5s ease 0s;
    }
    .banner-box:hover .banner-image{
        transform: scale(1.05);

    }
    .banner-box {
        overflow: hidden;
    }
    .banner-box::after{
        content: '';
        display: inline-block;
        width: 150%;
        height: 80%;
        position: absolute;
        right: 30%;
        top: -75%;
        background: rgba(255, 255, 255, 0.25);
        transform: skewY(-50deg);
        transition: all 0.5s ease;
    }
    .banner-box:hover::after {
        right: -75%;
        top: 120%;

    }


</style>