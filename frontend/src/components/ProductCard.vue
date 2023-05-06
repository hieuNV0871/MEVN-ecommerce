<template>
        <div class="overflow-hidden bg-[#000010] rounded-md text-dark-text flex flex-col  hover:shadow-btn">
            <router-link :to="props.data.slug">
                <!-- <img :src="props.data.images[0].src" alt="" class="h-[200px] object-cover"> -->
                <img class="h-[200px]" src="https://res.cloudinary.com/ddjil4odw/image/upload/v1681785648/banners/exy2vrnhz0lkunnbul1c.jpg" alt="">
            </router-link>
           
            <div class="flex flex-col flex-1">
                <div class="px-2 flex flex-col flex-1">
                    <div class="my-2 flex-1">
                        <h3 class="text-limit">{{props.data.name}}</h3>
                    </div>
                    <div class="flex justify-between gap-x-2 items-center">
                        <div>
                            <div>
                                <h3>{{ props.data.colors[0].price.toLocaleString() }} đ</h3>
                            </div>
                            <div v-if="props.data.colors[0].originPrice" class="flex gap-x-3">
                                <h3  class="line-through">{{ props.data.colors[0].originPrice.toLocaleString() }}</h3>
                                <h3  class="text-red-500">{{ 0 - Math.floor(((props.data.colors[0].originPrice
                                        - props.data.colors[0].price) / props.data.colors[0].originPrice * 100)) }}%</h3>
                            </div>
                        </div>
                        <div class="flex flex-col gap-y-2">
                            <div @click="handleToggleLike"  class="relative w-8 h-8 p-1 bg-dark-gray hover:shadow-btn hover:bg-primary transition-all ease-linear duration-300 flex items-center justify-center rounded-full cursor-pointer">
                                <HeartFilled :style="isInWishlish ? 'color: red' : 'color: #cbd5e1'"/>
                            </div>
                            <div class="relative w-8 h-8 p-1 bg-dark-gray hover:shadow-btn hover:bg-primary transition-all ease-linear duration-300 flex items-center justify-center rounded-full cursor-pointer">
                                <ShoppingCartOutlined/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex justify-center my-2 pb-2">
                    <router-link class="btn btn-outline-effect" :to="props.data.slug"><span>Xem chi tiết</span><i></i></router-link>
                </div>
            </div>
        </div>

</template>
<script setup>
    import { ref } from 'vue';
    import { HeartFilled, ShoppingCartOutlined } from '@ant-design/icons-vue';

    const isInWishlish = ref(false)

    const props = defineProps({
        data: Object
    })

    
    const handleToggleLike = () => {
        isInWishlish.value = !isInWishlish.value
    }

</script>
<style>
    .text-limit {
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }
</style>