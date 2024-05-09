import { createRouter, createWebHistory } from "vue-router";
import BoardListView from "../views/BoardListView.vue";
import BoardViewView from "@/views/BoardViewView.vue";
import BoardWriteView from "@/views/BoardWriteView.vue";
import RouterMainView from "@/views/routers/RouterMainView.vue";
import RouterParamView from "@/views/routers/RouterParamView.vue";
import RouterQueryView from "@/views/routers/RouterQueryView.vue";
import BoardModifyView from "@/views/BoardModifyView.vue";

const routes = [
  {
    path: "/",
    alias: ["/list"],
    name: "list",
    component: BoardListView,
  },
  {
    path: "/view",
    name: "view",
    component: BoardViewView,
    beforeEnter: (to, from, next) => {
      console.log(from);
      if (to.query.no == "" || Object.keys(to.query).length == 0) {
        alert("잘못된 접근입니다.");
        next({ name: from.name });
      }
      next();
    },
  },
  {
    path: "/write",
    name: "write",
    component: BoardWriteView,
  },
  {
    path: "/modify/:no",
    name: "modify",
    component: BoardModifyView,
    props: true,
  },
  {
    path: "/router-main",
    name: "routerMain",
    component: RouterMainView,
  },
  {
    path: "/router-param/:message?",
    name: "routerParam",
    component: RouterParamView,
    props: true,
  },
  {
    path: "/router-query",
    name: "routerQuery",
    component: RouterQueryView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
