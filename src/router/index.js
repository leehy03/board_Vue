import { createRouter, createWebHistory } from "vue-router";
import BoardListView from "../views/BoardListView.vue";
import BoardViewView from "@/views/BoardViewView.vue";
import BoardWriteView from "@/views/BoardWriteView.vue";

const routes = [
  {
    path: "/",
    name: "list",
    component: BoardListView,
  },
  {
    path: "/view",
    name: "view",
    component: BoardViewView,
  },
  {
    path: "/write",
    name: "write",
    component: BoardWriteView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
