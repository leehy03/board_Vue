<template>
  <div class="container mt-3">
    <TitleComponent />
    <router-view />
  </div>
</template>
<script setup>
import TitleComponent from "@/components/layouts/TitleComponent.vue";
</script>
