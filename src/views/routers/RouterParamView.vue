<template>
  <div>router-main에서 가져온 메세지: {{ $route.params.message }}</div>
  <div>router-main에서 가져온 메세지(props):{{ props.message }}</div>
</template>
<script>
import { useRoute } from "vue-router";
export default {
  name: "RouterParamView",
  props: ["message"],
  setup(props) {
    const route = useRoute();
    console.log(route.params.message);
    return {
      props,
    };
  },
};
</script>
