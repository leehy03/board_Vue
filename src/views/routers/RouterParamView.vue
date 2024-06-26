<script setup>
const props = defineProps(["message"])
</script>

<template>
  <div>router-main에서 가져온 메세지: {{ $route.params.message }}</div>
  <div>router-main에서 가져온 메세지(props):{{ props.message }}</div>
</template>
