<script setup>
import { ref, onMounted, computed } from "vue"
import Axios from "axios"
import { useRouter } from "vue-router"

const router = useRouter()
// const { proxy } = getCurrentInstance()
let boardList = ref(new Array())
let searchKeyword = ref(new String())
const keywordTypeOptions = [
  { label: "선택", value: "none" },
  { label: "작성자", value: "author" },
  { label: "제목", value: "title" },
]
let keywordType = ref(keywordTypeOptions[0].value)
let keywordTypeRef = ref(null)
let pageSize = 5
const totalCount = ref(new Number())
const currentPage = ref(new Number())

// vue3 lifecycle hooks 찾아보기
onMounted(() => {
    searchBoardList(1)
})

/**
 * 게시글 목록을 불러옵니다.
 */
const searchBoardList = (page) => {
  if (keywordType.value == keywordTypeOptions[0].value && searchKeyword.value.length > 0) {
    alert("유형을 선택해 주세요")
    // proxy.$refs.keywordTypeRef.focus()
    keywordTypeRef.value.focus()
    return false
  }
  Axios.get("http://localhost:8070/boards/list", {
    params: {
      keyword: searchKeyword.value,
      type: keywordType.value,
      pageSize: pageSize,
      currentPage: page,
    },
  })
    .then(function (response) {
      boardList.value = response.data.contents
      totalCount.value = response.data.totalCount
      currentPage.value = response.data.currentPage
    })
    .catch(function (error) {
      console.log(error)
    })
}

/**
 * 상세 페이지로 이동합니다.
 *
 * @param {Number} boardNo
 */
const moveViewPage = (boardNo) => {
  router.push({ name: "view", query: { no: boardNo } })
}

/**
 * 작성 페이지로 이동합니다.
 *
 */
const moveWritePage = () => {
  router.push({ name: "write" })
}

/**
 * 날짜 포멧을 변경합니다.
 *
 * @param {String} val (yyyy-MM-dd HH:mm:ss)
 * @returns {String} formatted date (yyyy-MM-dd)
 */
const formatDate = computed(() => {
  return (val) => {
    let formattedDate = ""
    if (val) {
      formattedDate = val.substr(0, 10)
    }
    return formattedDate
  }
})

/**
 * 사용자가 선택한 페이지의 게시글 데이터를 조회합니다.
 *
 * @param {Number} page
 */
const updateCurrentPage = (page) =>{
  searchBoardList(page)
}
</script>

<template>
  <div class="row mb-5">
    <div class="col-2">
      <select v-model="keywordType" class="form-select" ref="keywordTypeRef">
        <option v-for="option, i in keywordTypeOptions" :key="i" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
    <div class="col-4">
      <input type="text" class="form-control" placeholder="검색어를 입력하세요." v-model="searchKeyword" />
    </div>
    <div class="col-1">
      <button type="button" class="btn btn-outline-success" @click="searchBoardList(currentPage)">
        조회
      </button>
    </div>
  </div>
  <table class="table table-hover">
    <thead>
      <tr>
        <th class="text-center">#</th>
        <th>Title</th>
        <th class="text-center">Author</th>
        <th class="text-center">Create Date</th>
        <th class="text-center">View</th>
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
  <div class="row justify-content-center">
    <div class="col-6">
      <b-pagination align="center" @change="updateCurrentPage" v-model="currentPage" :total-rows="totalCount" :per-page="pageSize" first-number
        last-number></b-pagination>
    </div>
  </div>
  <div>
    <RouterLink to="/router-main">Go To RouterMainView</RouterLink>
  </div>
</template>