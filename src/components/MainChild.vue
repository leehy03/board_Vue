<template>
  <h5>Child Component Here!</h5>
  <div class="row mb-3">
    <div class="col-2 text-center">
      <label class="col-form-label">부모에게 보낼 메시지</label>
    </div>
    <div class="col-3">
      <input
        type="text"
        class="form-control"
        placeholder="메시지를 입력하세요."
        v-model="childMessage"
      />
    </div>
  </div>
  <div class="row">
    <div>자식에서 생성된 메시지: {{ childMessage }}</div>
    <div>부모에서 받아온 메시지: {{ props.parentMessage }}</div>
  </div>
</template>
<script>
import { ref, watch } from "vue";
export default {
  name: "MainChild",
  props: ["parentMessage"],
  setup(props, { emit }) {
    const childMessage = ref(new String());

    watch(
      () => childMessage.value,
      () => {
        emit("changeMessage", childMessage.value);
      }
    );

    return { childMessage, props };
  },
};
</script>
