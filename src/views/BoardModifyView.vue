<script setup>
import { ref, onMounted, getCurrentInstance } from "vue";
import Axios from "axios";
import { useRouter, useRoute } from "vue-router";
const { proxy } = getCurrentInstance();
const route = useRoute();
const router = useRouter();
const board = ref(new Object());

onMounted(() => {
  searchBoardView();
});

/**
 * 작성된 게시글 가져옵니다.
 */
const searchBoardView = () => {
  Axios.get("http://localhost:8070/boards", {
    params: {
      no: route.params.no,
      page: "modify",
    },
  })
    .then((response) => {
      if (typeof response.data == "string") {
        alert("데이터가 존재하지 않습니다.");
        router.push({ name: "list" });
      } else {
        if (isVaildPassword(response.data.password)) {
          board.value = response.data;
        } else {
          router.push({ name: "list" });
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * 입력한 비밀번호가 설정한 비밀번호와 일치한지 확인합니다.
 *
 * @param {String} boardPassword
 * @returns {Boolean} 비밀번호 일치 시 true, 그 외 false 반환.
 */
const isVaildPassword = (boardPassword) => {
  const password = prompt("비밀번호를 입력하세요.");
  if (password != null) {
    if (password == boardPassword) {
      return true;
    } else if (password == "") {
      alert("비밀번호를 입력하세요.");
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  }
  return false;
};

/**
 * 작성된 글을 업데이트합니다.
 */
const saveBoardView = () => {
  // 유효성 검사 후 실패 시 alert 및 focusing
  if (board.value.author == "" || board.value.author == null) {
    alert("작성자를 입력해 주세요");
    proxy.$refs.authorRef.focus();
    return false;
  }
  if (board.value.password == "" || board.value.password == null) {
    alert("비밀번호를 입력해 주세요");
    proxy.$refs.passwordRef.focus();
    return false;
  }
  if (board.value.title == "" || board.value.title == null) {
    alert("제목을 입력해 주세요");
    proxy.$refs.titleRef.focus();
    return false;
  }
  if (board.value.content == "" || board.value.content == null) {
    alert("내용을 입력해 주세요");
    proxy.$refs.contentRef.focus();
    return false;
  }

  Axios.put("http://localhost:8070/boards", {
    boardNo: route.params.no,
    author: board.value.author,
    password: board.value.password,
    title: board.value.title,
    content: board.value.content,
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
 * 이전 페이지로 이동합니다.
 */
const moveBackPage = () => {
  // router.push({ name: "view" });
  router.go(-1);
};

</script>
<template>
  <div v-if="Object.keys(board).length > 0">
    <div class="row mb-3">
      <div class="col-6">
        작성자
        <input type="text" class="form-control" placeholder="작성자를 입력하세요." v-model="board.author" ref="authorRef" />
      </div>
      <div class="col-6">
        비밀번호
        <input type="password" class="form-control" placeholder="비밀번호를 입력하세요." v-model="board.password"
          ref="passwordRef" />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12">
        제목
        <input type="text" class="form-control" placeholder="제목을 입력하세요." v-model="board.title" ref="titleRef" />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12">
        내용
        <textarea class="form-control" placeholder="내용을 입력하세요." rows="10" v-model="board.content"
          ref="contentRef"></textarea>
      </div>
    </div>
    <div class="row mb-3 justify-content-end">
      <div class="col-1">
        <button type="button" class="w-100 btn btn-outline-primary" @click="saveBoardView">
          Save
        </button>
      </div>
      <div class="col-1">
        <button type="button" class="w-100 btn btn-outline-danger" @click="moveBackPage">
          Back
        </button>
      </div>
    </div>
  </div>
</template>