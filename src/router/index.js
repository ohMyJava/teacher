import Vue from "vue";
import Router from "vue-router";
import index from "../pages/index";
import Login from "../pages/login/login";
import Reg from "../pages/login/reg";
import Article from "../pages/page/Article";
import TutorCenter from "../pages/page/TutorCenter";
import StuCenter from "../pages/page/StuCenter";
import PersonCenter from "../pages/page/PersonCenter";
import Admin from "../pages/cms/Admin";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Index",
      component: index, // ni bu xian zhe ge liu neng huang yan ma ?
      // index 这个路由下面的router-view只能展示information，不能展示hello
      // hello 就直接跳转到那个hello页面了  就不能和information一样在同一个页面中跳转了
      redirect: "/article",
      children: [
        {
          path: "/login",
          name: "Login",
          component: Login
        },
        {
          path: "/article",
          name: "Article",
          component: Article
        },
        {
          path: "/tutorCenter",
          name: "TutorCenter",
          component: TutorCenter
        },
        {
          path: "/stuCenter",
          name: "StuCenter",
          component: StuCenter
        },
        {
          path: "/personCenter",
          name: "PersonCenter",
          component: PersonCenter
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: Login
      // 这就是页面的用法
    },
    {
      path: "/reg",
      name: "reg",
      component: Reg

      // 这就是页面的用法
    },
    {
      path: "/admin",
      name: "Admin",
      component: Admin,
      children: [
        {
          path: "/admin/student",
          name: "student",
          component: () => import("../pages/cms/student")
        },
        {
          path: "/admin/teacher",
          name: "teacher",
          component: () => import("../pages/cms/teacher")
        },
        {
          path: "/admin/order",
          name: "order",
          component: () => import("../pages/cms/order")
        },
        {
          path: "/admin/system",
          name: "system",
          component: () => import("../pages/cms/system")
        }
      ]
    }
  ]
});
