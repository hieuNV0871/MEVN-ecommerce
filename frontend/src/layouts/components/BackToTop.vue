
<script setup>
    import { ref, onMounted } from 'vue';

    import {ArrowUpOutlined} from '@ant-design/icons-vue'
    
    const isShowBackToTopBtn = ref(false)
    
    // @methods
    const onBackToTop = function(){
        window.scrollTo({top:0, behavior: 'smooth'})
    }
    onMounted(()=>{
        window.addEventListener('scroll', handleScroll);
    })

    
    const handleScroll = function() {
        if(window.scrollY >= 500) {
            isShowBackToTopBtn.value = true
        }else {
            isShowBackToTopBtn.value = false
        }
    }
</script>
<template>
    <div :class="isShowBackToTopBtn ? '' : 'hidden'">
        <div class="fixed right-4 bottom-10 z-[99999]">
            <button @click="onBackToTop" class="w-10 h-10 rounded-full bg-gray-500 hover:bg-primary flex justify-center items-center">
               <ArrowUpOutlined />
            </button>
        </div>
    </div>
</template>

<style>
    
</style>