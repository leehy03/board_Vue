<script setup>
import Axios from "axios";
import { useRouter } from "vue-router";
import { ref, getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance();
const router = useRouter();
const author = ref(new String());
const password = ref(new String());
const title = ref(new String());
const content = ref(new String());

/**
 * 작성된 글을 저장합니다.
 */
const saveBoard = () => {
  // 유효성 검사 후 실패 시 alert 및 focusing
  if (author.value == "" || author.value == null) {
    alert("작성자를 입력해 주세요");
    proxy.$refs.authorRef.focus();
    return false;
  }
  if (password.value == "" || password.value == null) {
    alert("비밀번호를 입력해 주세요");
    proxy.$refs.passwordRef.focus();
    return false;
  }
  if (title.value == "" || title.value == null) {
    alert("제목을 입력해 주세요");
    proxy.$refs.titleRef.focus();
    return false;
  }
  if (content.value == "" || content.value == null) {
    alert("내용을 입력해 주세요");
    proxy.$refs.contentRef.focus();
    return false;
  }

  Axios.post("http://localhost:8070/boards", {
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

/**
 * 목록 페이지로 이동합니다.
 */
const moveBackPage = () => {
  router.push({ name: "list" });
  // router.go(-1);
};

</script>

<template>
  <div class="row mb-3">
    <div class="col-6">
      작성자
      <input type="text" class="form-control" placeholder="작성자를 입력하세요." v-model="author" ref="authorRef" />
    </div>
    <div class="col-6">
      비밀번호
      <input type="password" class="form-control" placeholder="비밀번호를 입력하세요." v-model="password" ref="passwordRef" />
    </div>
  </div>
  <div class="row mb-3">
    <div class="col-12">
      제목
      <input type="text" class="form-control" placeholder="제목을 입력하세요." v-model="title" ref="titleRef" />
    </div>
  </div>
  <div class="row mb-3">
    <div class="col-12">
      내용
      <textarea class="form-control" placeholder="내용을 입력하세요." rows="10" v-model="content" ref="contentRef"></textarea>
    </div>
  </div>
  <div class="row mb-3 justify-content-end">
    <div class="col-1">
      <button type="button" class="w-100 btn btn-outline-primary" @click="saveBoard">
        Save
      </button>
    </div>
    <div class="col-1">
      <button type="button" class="w-100 btn btn-outline-danger" @click="moveBackPage">
        Back
      </button>
    </div>
  </div>
</template>
