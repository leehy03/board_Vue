<template>
  <div class="row mb-3">
    <div class="col-6">
      작성자
      <input
        type="text"
        class="form-control"
        placeholder="작성자를 입력하세요."
        v-model="author"
        ref="authorRef"
      />
    </div>
    <div class="col-6">
      비밀번호
      <input
        type="password"
        class="form-control"
        placeholder="비밀번호를 입력하세요."
        v-model="password"
        ref="passwordRef"
      />
    </div>
  </div>
  <div class="row mb-3">
    <div class="col-12">
      제목
      <input
        type="text"
        class="form-control"
        placeholder="제목을 입력하세요."
        v-model="title"
        ref="titleRef"
      />
    </div>
  </div>
  <div class="row mb-3">
    <div class="col-12">
      내용
      <input
        type="text"
        class="form-control"
        placeholder="내용을 입력하세요."
        v-model="content"
        ref="contentRef"
      />
    </div>
  </div>
  <div class="row mb-3 justify-content-end">
    <div class="col-1">
      <button
        type="button"
        class="w-100 btn btn-outline-primary"
        @click="saveBoardView"
      >
        Save
      </button>
    </div>
    <div class="col-1">
      <button
        type="button"
        class="w-100 btn btn-outline-danger"
        @click="moveBackPage"
      >
        Back
      </button>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import Axios from "axios";
import { useRouter, useRoute } from "vue-router";
export default {
  name: "BoardViewView",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const board = ref(new Object());
    const title = ref(new String());
    const author = ref(new String());
    const password = ref(new String());
    const content = ref(new String());

    onMounted(() => {
      searchBoardView();
    });

    const searchBoardView = () => {
      Axios.get("http://localhost:8070/boards", {
        params: {
          no: route.params.no,
        },
      })
        .then(function (response) {
          author.value = response.data.author;
          content.value = response.data.content;
          title.value = response.data.title;
          password.value = response.data.password;
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    const saveBoardView = () => {
      Axios.put("http://localhost:8070/boards", {
        boardNo: route.params.no,
        author: author.value,
        password: password.value,
        title: title.value,
        content: content.value,
      })
        .then((response) => {
          if (response.data == 1) {
            alert("작성이 완료되었습니다.");
            moveBackPage();
          } else {
            alert("작성이 실패되었습니다.");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const moveBackPage = () => {
      // router.push({ name: "view" });
      router.go(-1);
    };

    return {
      saveBoardView,
      moveBackPage,
      board,
      author,
      password,
      title,
      content,
    };
  },
  computed: {
    formatDate() {
      return (val) => {
        let formattedDate = "";
        if (val) {
          formattedDate = val.substr(0, 10);
        }
        return formattedDate;
      };
    },
  },
};
</script>
