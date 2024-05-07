<template>
  <div class="container">
    <div class="text-center fs-2 mb-5">HY`s Board</div>
    <div class="row mb-5">
      <div class="col-2">
        <select class="form-select" @change="selectKeywordType">
          <option selected>선택</option>
          <option value="author">작성자</option>
          <option value="title">제목</option>
        </select>
      </div>
      <div class="col-4">
        <input
          type="text"
          class="form-control"
          placeholder="입력하세요."
          v-model="searchKeyword"
        />
      </div>
      <div class="col-1">
        <button
          type="button"
          class="btn btn-outline-success mb-3"
          @click="searchBoard()"
        >
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
        <tr
          v-for="board in boardList"
          :key="board.boardNo"
          role="button"
          @click="moveViewPage(board.boardNo)"
        >
          <td class="text-center">{{ board.boardNo }}</td>
          <td>{{ board.title }}</td>
          <td class="text-center">{{ board.author }}</td>
          <td class="text-center">{{ formatDate(board.createdDt) }}</td>
          <td class="text-center">{{ board.views }}</td>
        </tr>
      </tbody>
    </table>
    <div class="row justify-content-end">
      <div class="col-auto">
        <button
          type="button"
          class="btn btn-outline-primary mb-4"
          @click="moveWritePage()"
        >
          Write
        </button>
      </div>
    </div>
    <div>
      <RouterLink to="/router-main">Go To RouterMainView</RouterLink>
    </div>
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
    let keywordType = new String();

    // vue3 lifecycle hooks 찾아보기
    onMounted(() => {
      searchBoard();
    });

    const searchBoard = () => {
      console.log(keywordType);
      console.log(typeof keywordType);
      Axios.get("http://localhost:8070/boards/list", {
        params: {
          keyword: searchKeyword.value,
          type: keywordType,
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

    const selectKeywordType = (event) => {
      keywordType = event.target.value;
    };

    return {
      boardList,
      searchKeyword,
      searchBoard,
      selectKeywordType,
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
