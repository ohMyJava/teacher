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
  mode: 'history',
  routes: [
    {
      path: "*",
      name: "error",
      component:()=>import('../pages/page/Error')
    },
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
          component: PersonCenter,
          redirect: "/personCenter/info",
          children: [
            {
              path: "/personCenter/info",
              name: "personInfo",
              component: ()=>import("../pages/page/person/personInfo"),
            },
            {
              path: "/personCenter/tutor",
              name: "isTutor",
              component: ()=>import("../pages/page/person/isTutor"),
            },
            {
              path: "/personCenter/student",
              name: "isStudent",
              component: ()=>import("../pages/page/person/isStudent"),
            },
            {
              path: "/personCenter/comment",
              name: "comment",
              component: ()=>import("../pages/page/person/comment"),
            },
            {
              path: "/personCenter/order",
              name: "order",
              component: ()=>import("../pages/page/person/order"),
            },
            {
              path: "/personCenter/message",
              name: "message",
              component: ()=>import("../pages/page/person/message"),
            },
          ]
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
          component: () => import("../pages/cms/tutor")
        },
        {
          path: "/admin/order",
          name: "order",
          component: () => import("../pages/cms/order")
        },
        {
          path: "/admin/system",
          name: "system",
          component: () => import("../pages/cms/system"),
          redirect: "/admin/systemEdit"
        },
        {
          path: "/admin/systemEdit",
          name: "systemEdit",
          component: () => import("../pages/cms/system0/systemEdit")
        },
        {
          path: "/admin/systemLog",
          name: "systemLog",
          component: () => import("../pages/cms/system0/systemLog")
        },
        {
          path: "/admin/systemComment",
          name: "systemComment",
          component: () => import("../pages/cms/system0/systemComment")
        },
        {
          path: "/admin/user",
          name: "user",
          component: () => import("../pages/cms/user"),
        }
      ]
    }
  ]
});
