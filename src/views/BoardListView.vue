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
      <tr
        v-for="board in boardList"
        :key="board.boardNo"
        @click="moveViewPage(board.boardNo)"
      >
        <td>{{ board.boardNo }}</td>
        <td>{{ board.title }}</td>
        <td>{{ board.author }}</td>
        <td>{{ formatDate(board.createdDt) }}</td>
        <td>{{ board.views }}</td>
      </tr>
    </tbody>
  </table>
  <div class="col-auto">
    <button type="button" class="btn btn-primary mb-4" @click="moveWritePage()">
      Write
    </button>
  </div>
  <div>
    <RouterLink to="/router-main">Go To RouterMainView</RouterLink>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import Axios from "axios";
import { useRouter } from "vue-router";
export default {
  name: "BoardListView",
  setup() {
    const router = useRouter();
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
          console.log(response.data);
          boardList.value = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    const moveViewPage = (boardNo) => {
      router.push({ name: "view", query: { no: boardNo } });
    };

    const moveWritePage = () => {
      router.push({ name: "write" });
    };

    return {
      boardList,
      searchKeyword,
      searchBoard,
      moveViewPage,
      moveWritePage,
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
