<template>
  <div v-if="Object.keys(board).length > 0">
    <div class="row mb-3">
      <div class="col-4">작성자 {{ board.author }}</div>
      <div class="col-4">작성날짜 {{ formatDate(board.createdDt) }}</div>
      <div class="col-4">조회수 {{ board.views }}</div>
    </div>
    <div class="row mb-3">
      <div class="col-12">
        제목
        <div class="form-control custom-min-height">{{ board.title }}</div>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12">
        내용
        <div class="form-control custom-min-height">{{ board.content }}</div>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-1">
        <button
          type="button"
          class="w-100 btn btn-outline-success"
          @click="moveListPage"
        >
          List
        </button>
      </div>
      <div class="col-1 ms-auto">
        <button
          type="button"
          class="w-100 btn btn-outline-primary"
          @click="moveModifyPage"
        >
          Modify
        </button>
      </div>
      <div class="col-1">
        <button
          type="button"
          class="w-100 btn btn-outline-danger"
          @click="deleteBoard"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onBeforeMount } from "vue";
import Axios from "axios";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "BoardViewView",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const board = ref(new Object());

    onBeforeMount(() => {
      searchBoardView();
    });

    /**
     * 작성된 게시글을 삭제합니다.
     */
    const deleteBoard = () => {
      const password = prompt("비밀번호를 입력하세요.");
      if (password != null) {
        if (password == "") {
          alert("비밀번호를 입력하세요.");
        } else if (password == board.value.password) {
          Axios.delete("http://localhost:8070/boards", {
            params: {
              no: route.query.no,
            },
          })
            .then(() => {
              alert("삭제가 완료되었습니다.");
              router.push({ name: "list" });
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          alert("비밀번호가 일치하지 않습니다.");
        }
      }
    };

    /**
     * 작성된 게시글을 가져옵니다.
     */
    const searchBoardView = () => {
      Axios.get("http://localhost:8070/boards", {
        params: {
          no: route.query.no,
        },
      })
        .then((response) => {
          if (typeof response.data == "string") {
            alert("데이터가 존재하지 않습니다.");
            router.go(-1);
          } else {
            board.value = response.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    /**
     * 수정 페이지로 이동합니다.
     */
    const moveModifyPage = () => {
      router.push({ name: "modify", params: { no: board.value.boardNo } });
    };

    /**
     * 목록 페이지로 이동합니다.
     */
    const moveListPage = () => {
      router.push({ name: "list" });
      // router.go(-1);
    };

    return {
      searchBoardView,
      moveModifyPage,
      moveListPage,
      deleteBoard,
      board,
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
