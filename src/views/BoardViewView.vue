<template>
  <div>
    {{ board.boardNo }}
    {{ board.title }}
    {{ board.author }}
    {{ board.password }}
    {{ board.content }}
    {{ formatDate(board.createdDt) }}
    {{ board.views }}
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import Axios from "axios";
import { useRoute } from "vue-router";
export default {
  name: "BoardViewView",
  setup() {
    const route = useRoute();
    const board = ref(new Object());

    onMounted(() => {
      searchBoardView();
    });

    const searchBoardView = () => {
      Axios.get("http://localhost:8070/boards", {
        params: {
          no: route.query.no,
        },
      })
        .then(function (response) {
          board.value = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    return {
      searchBoardView,
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
