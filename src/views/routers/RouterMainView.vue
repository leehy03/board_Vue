<template>
  <div class="mb-5">
    <RouterLink to="/list">Go To BoardListView</RouterLink>
  </div>
  <h5>Page to Page!</h5>
  <div class="row mb-5">
    <div class="col-2 text-center">
      <label class="col-form-label">다른 페이지로 보낼 메시지</label>
    </div>
    <div class="col-3">
      <input
        type="text"
        class="form-control"
        placeholder="메시지를 입력하세요."
        v-model="message"
      />
    </div>
    <div class="offset-2 col-2">
      <button type="button" class="btn btn-primary" @click="moveToParamView()">
        Go To ParamView
      </button>
    </div>
    <div class="col-2">
      <button type="button" class="btn btn-primary" @click="moveToQueryView()">
        Go To QueryView
      </button>
    </div>
  </div>

  <h5>Parent Component Here!</h5>
  <div class="row mb-3">
    <div class="col-2 text-center">
      <label class="col-form-label">자식에게 보낼 메시지</label>
    </div>
    <div class="col-3">
      <input
        type="text"
        class="form-control"
        placeholder="메시지를 입력하세요."
        v-model="parentMessage"
      />
    </div>
  </div>
  <div class="row mb-5">
    <div>부모에서 생성된 메시지: {{ parentMessage }}</div>
    <div>자식에서 받아온 메시지: {{ childMessage }}</div>
  </div>
  <div class="row">
    <MainChild
      @changeMessage="updateChildMessage"
      :parentMessage="parentMessage"
    />
  </div>
</template>
<script>
import MainChild from "@/components/MainChild.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "RouterMainView",
  components: {
    MainChild,
  },
  setup() {
    const router = useRouter();
    const message = ref(new String());
    const parentMessage = ref(new String());
    const childMessage = ref(new String());

    const moveToParamView = () => {
      // 'params' can not be used with 'path'
      // router.push({ path: "/router-query", params: { message: message } }); X
      router.push({ name: "routerParam", params: { message: message.value } });
    };

    const moveToQueryView = () => {
      router.push({ path: "/router-query", query: { message: message.value } });
    };

    const updateChildMessage = (value) => {
      childMessage.value = value;
    };

    return {
      moveToParamView,
      moveToQueryView,
      updateChildMessage,
      message,
      parentMessage,
      childMessage,
    };
  },
};
</script>
