<script setup>
    const props = defineProps({
        datas: Object
    })
</script>
<template>

    <router-link
    v-for="(item, index) in datas" :key="index"
      :to="`/${item.slug}`"
      className="flex items-center py-[6px] px-4 cursor-pointer hover:bg-[#16182308]"
    >
      <img
        :src="item.images[0].src"
        alt=""
        className="w-10 h-10 rounded object-cover"
      />
      <div className="flex-1 ml-3 overflow-hidden">
        <h4 className="overflow-hidden text-ellipsis whitespace-nowrap block">
          {{item.name}}
        </h4>
        <span className="text-sm text-[#16182380]">{{ Number(item.colors[0].price).toLocaleString()  }} đ </span>
      </div>
    </router-link>
</template>

<style>
    
</style>