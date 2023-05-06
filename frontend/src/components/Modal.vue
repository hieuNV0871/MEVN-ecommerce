<template>
      <teleport to="body">
        <div class="fixed z-[99999999] inset-0 bg-opacity-50 bg-gray-900 flex items-center justify-center text-black">
          <div class="bg-white rounded-lg overflow-hidden min-w-[200px]">
            <div class="bg-gray-100 px-4 py-2 flex items-center justify-between">
              <slot name="header">
                <h2 class="text-lg font-bold">Default Title</h2>
              </slot>
              <button @click="closeModal">
                <svg class="w-6 h-6 text-gray-600 hover:text-gray-800" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
            <div class="p-4">
              <slot name="content">
                <p>Default content.</p>
              </slot>
            </div>
            <div class="bg-gray-100 px-4 py-2 flex items-center justify-end">
              <slot name="footer">
                
              </slot>
            </div>
          </div>
        </div>
      </teleport>
  </template>
  
  <script setup>
  import { defineEmits } from 'vue';

  
  const closeModal = () => {
    // Emit custom event to parent component
    emit('close');
  };


  
  const emit = defineEmits(['close']);
  </script>
  
  <style>

  </style>
  