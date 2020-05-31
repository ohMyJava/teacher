<template>
  <div id="app">
    <router-view/>
    <!--路由就是这么用-->
    <!--有个问题就是 这个router-view只能展现当前路由的子路由-->
    <!--App 文件是整个页面的入口文件-->
  </div>
</template>

<script>
  // 这就是组件的用法
  // 组件是通过在页面中引入使用
export default {
  name: 'App',
  created(){
    if (sessionStorage) {
      let token = sessionStorage.getItem("token");
      let type = sessionStorage.getItem("type");
      let username = sessionStorage.getItem("username");
      let id = sessionStorage.getItem("id")
      this.$store.dispatch("setUser",{username,type,token,id});
    }
  },
  mounted: function () {
    //此方法刷新页面时也会执行
   /* window.addEventListener('beforeunload',()=>{
      localStorage.removeItem('token');
    });*/
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
