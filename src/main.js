// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.css'
import Vuex from 'vuex'
import store from './vuex/store'

// 安装了插件  就在这个文件里引入并使用
import ElementUI from 'element-ui'

Vue.config.productionTip = false;
Vue.use(axios); // 这样就把axios注册到当前的项目里了
Vue.use(ElementUI); // ElementUi就注册进去了
// 看着文档用element的组件就可以了
Vue.prototype.$axios = axios;
//axios.defaults.headers.post['Content-Type'] = 'application/json';
//axios.defaults.baseURL = 'http://localhost:8888';  // 假设你的后端跑在8000端口


// http request拦截器 添加一个请求拦截器
axios.interceptors.request.use(function (config) {

  let token = store.state.token;
  let userName = store.state.userName;

  config.headers.token = token;
  config.headers.userName = userName;

  return config;
});

axios.defaults.withCredentials = false;
// 这样在vue文件里 就可以通过this.$axios来使用它了
Vue.use(Vuex);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store:store,
})
