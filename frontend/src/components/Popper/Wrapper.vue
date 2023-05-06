<script setup>
        const props =defineProps({
            class: String
        })
   
</script>
<template>
        <div class="absolute overflow-auto flex flex-col py-2 rounded-lg bg-white  max-h-search shadow-2xl" :class="class">
            <slot/>
        </div>
</template>
<style scoped>
    
</style>