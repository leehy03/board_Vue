<script setup>
import { ref, onMounted, computed } from "vue"
import Axios from "axios"

const props = defineProps(["boardNo"])
const writeComment = ref(new String())
const writeAuthor = ref(new String())
const commentList = ref(new String())
let pageSize = 2
const totalCount = ref(new Number())
const currentPage = ref(new Number())

onMounted(() => {
  searchCommentList(1)
})

const searchCommentList = (page) => {
  Axios.get("http://localhost:8070/comments/list", {
    params: {
      no: props.boardNo,
      pageSize: pageSize,
      currentPage: page,
    },
  })
    .then(function (response) {
      commentList.value = response.data.contents
      totalCount.value = response.data.totalCount
      currentPage.value = response.data.currentPage
    })
    .catch((error) => {
      console.log(error)
    })
}

const boardComment = () => {
  const password = prompt("비밀번호를 입력하세요.")
  if (password != null) {
    Axios.post("http://localhost:8070/comments", {
      boardNo: props.boardNo,
      comment: writeComment.value,
      author: writeAuthor.value,
      password: password,
    })
      .then((response) => {
        if (response.data == 1) {
          alert("댓글이 성공적으로 게시되었습니다.")
          searchCommentList()
          writeAuthor.value = ''
          writeComment.value = ''
        } else {
          alert("댓글을 게시하지 못하였습니다. 다시 입력해주세요.")
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

/**
 * 사용자가 선택한 페이지의 댓글 데이터를 조회합니다.
 *
 * @param {Number} page
 */
const updateCurrentPage = (page) =>{
  searchCommentList(page)
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

const removeComment = (id, pw) => {
  const inputPassword = prompt("비밀번호를 입력하세요.")
  if (inputPassword != null) {
    if (inputPassword == "") {
      alert("비밀번호를 입력하세요.")
    } else if (inputPassword == pw) {
      Axios.delete("http://localhost:8070/comments", {
        params: {
          no: id,
        },
      })
        .then(() => {
          alert("삭제가 완료되었습니다.")
          searchCommentList()
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      alert("비밀번호가 일치하지 않습니다.")
    }
  }
}
</script>

<template>
  <div class="row">
    <p class="fs-3 fw-bolder">댓글</p>
  </div>
  <table class="table">
    <thead>
      <tr>
        <th class="text-center">#</th>
        <th>Comment</th>
        <th class="text-center">Author</th>
        <th class="text-center">Create Date</th>
        <th class="text-center">Remove</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="comment in commentList" :key="comment.commentNo">
        <td class="text-center align-middle"> {{ comment.commentNo }}</td>
        <td class="align-middle"> {{ comment.comment }}</td>
        <td class="text-center align-middle"> {{ comment.author }}</td>
        <td class="text-center align-middle">{{ formatDate(comment.createdDt) }}</td>
        <td class="text-center align-middle">
          <button class="btn btn-outline-danger custom-btn-padding"
            @click="removeComment(comment.commentNo, comment.password)">
            <BIconTrashFill />
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="row justify-content-center">
    <div class="col-6">
      <b-pagination align="center" @change="updateCurrentPage" v-model="currentPage" :total-rows="totalCount" :per-page="pageSize"
        first-number last-number></b-pagination>
    </div>
  </div>
  <div class="row">
    <div class="col-3">
      <input class="form-control" placeholder="Please enter an author" v-model="writeAuthor">
    </div>
    <div class="col-8">
      <input class="form-control" placeholder="Please enter a comment" v-model="writeComment">
    </div>
    <div class="col-1">
      <button class="w-100 btn btn-outline-secondary" @click="boardComment">Send</button>
    </div>
  </div>
</template>

<style scoped>
.custom-btn-padding {
  width: 41px;
  height: 35px;
  padding: 0;
  font-size: 17px;
}
</style>
