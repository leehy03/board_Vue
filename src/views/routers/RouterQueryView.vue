<template>
  <div>router-main에서 가져온 메세지: {{ $route.query.message }}</div>
</template>
<script>
export default {
  name: "RouterQueryView",
  setup() {},
};
</script>
