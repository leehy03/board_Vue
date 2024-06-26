<script setup>
import { ref, onMounted, getCurrentInstance, computed } from "vue";
import Axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const { proxy } = getCurrentInstance();
let boardList = ref(new Array());
let searchKeyword = ref(new String());
let keywordType = "none";

// vue3 lifecycle hooks 찾아보기
onMounted(() => {
  searchBoardList();
});

/**
 * 게시글 목록을 불러옵니다.
 */
const searchBoardList = () => {
  if (keywordType == "none" && searchKeyword.value.length > 0) {
    alert("유형을 선택해 주세요");
    proxy.$refs.keywordTypeRef.focus();
    return false;
  }
  Axios.get("http://localhost:8070/boards/list", {
    params: {
      keyword: searchKeyword.value,
      type: keywordType,
    },
  })
    .then(function (response) {
      boardList.value = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

/**
 * 상세 페이지로 이동합니다.
 *
 * @param {Number} boardNo
 */
const moveViewPage = (boardNo) => {
  router.push({ name: "view", query: { no: boardNo } });
};

/**
 * 작성 페이지로 이동합니다.
 *
 */
const moveWritePage = () => {
  router.push({ name: "write" })
};

/**
 * 셀렉트 박스 선택 시 선택된 value 를 업데이트합니다.
 *
 * @param {Object} event
 */
const updateKeywordType = (event) => {
  keywordType = event.target.value
};

/**
 * 날짜 포멧을 변경합니다.
 *
 * @param {String} val (yyyy-MM-dd HH:mm:ss)
 * @returns {String} formatted date (yyyy-MM-dd)
 */
const formatDate = computed(() => {
  return (val) => {
    let formattedDate = "";
    if (val) {
      formattedDate = val.substr(0, 10);
    }
    return formattedDate;
  };
})

</script>

<template>
  <div class="row mb-5">
    <div class="col-2">
      <select class="form-select" @change="updateKeywordType" ref="keywordTypeRef">
        <option value="none" selected>선택</option>
        <option value="author">작성자</option>
        <option value="title">제목</option>
      </select>
    </div>
    <div class="col-4">
      <input type="text" class="form-control" placeholder="검색어를 입력하세요." v-model="searchKeyword" />
    </div>
    <div class="col-1">
      <button type="button" class="btn btn-outline-success" @click="searchBoardList">
        조회
      </button>
    </div>
  </div>
  <table class="table table-hover">
    <thead>
      <tr>
        <th class="text-center">#</th>
        <th>제목</th>
        <th class="text-center">작성자</th>
        <th class="text-center">작성일시</th>
        <th class="text-center">조회수</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="board in boardList" :key="board.boardNo" role="button" @click="moveViewPage(board.boardNo)">
        <td class="text-center">{{ board.boardNo }}</td>
        <td>{{ board.title }}</td>
        <td class="text-center">{{ board.author }}</td>
        <td class="text-center">{{ formatDate(board.createdDt) }}</td>
        <td class="text-center">{{ board.views }}</td>
      </tr>
    </tbody>
  </table>
  <div class="row justify-content-end mb-3">
    <div class="col-auto">
      <button type="button" class="btn btn-outline-primary" @click="moveWritePage()">
        Write
      </button>
    </div>
  </div>
  <div>
    <RouterLink to="/router-main">Go To RouterMainView</RouterLink>
  </div>
</template>