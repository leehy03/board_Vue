<template>
  <div class="row">
    <div class="col-auto">
      <label class="col-form-label">검색</label>
    </div>
    <div class="col-auto">
      <input
        type="text"
        class="form-control"
        placeholder="입력하세요."
        v-model="searchKeyword"
      />
    </div>
    <div class="col-auto">
      <button type="button" class="btn btn-primary mb-3" @click="searchBoard()">
        조회
      </button>
    </div>
  </div>
  <table class="table table-hover">
    <thead>
      <tr>
        <th scope="col">번호</th>
        <th scope="col">제목</th>
        <th scope="col">작성자</th>
        <th scope="col">작성일시</th>
        <th scope="col">조회수</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="board in boardList" :key="board.boardNo">
        <td>{{ board.boardNo }}</td>
        <td>{{ board.title }}</td>
        <td>{{ board.author }}</td>
        <td>{{ board.createdDt }}</td>
        <td>{{ board.views }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import { ref, onMounted } from "vue";
import Axios from "axios";
export default {
  name: "BoardListView",
  setup() {
    let boardList = ref(new Array());
    let searchKeyword = ref(new String());

    // vue3 lifecycle hooks 찾아보기
    onMounted(() => {
      searchBoard();
    });

    const searchBoard = () => {
      Axios.get("http://localhost:8070/boards/list", {
        params: {
          keyword: searchKeyword.value,
        },
      })
        .then(function (response) {
          boardList.value = response.data;
          console.log(boardList);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    return {
      boardList,
      searchKeyword,
      searchBoard,
    };
  },
};
</script>
