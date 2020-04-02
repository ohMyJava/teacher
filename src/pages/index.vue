<template>
    <div class="body">
      <div class="headerWrapper">
        <header class="header">
          <div class="container">
          <h1><a href="/"><img src="../../static/logo.png" height="100px"></a></h1>
          <div class="nav">
            <el-menu
              router
              :default-active="activeIndex"
              class="el-menu-demo"
              mode="horizontal"
              @select="handleSelect"
              text-color="#1989fa"
              active-text-color="#fdee02">
              <el-menu-item index="/article">公告中心</el-menu-item>
              <el-menu-item index="/tutorCenter">家教中心</el-menu-item>
              <el-menu-item index="/stuCenter">学生中心</el-menu-item>
              <el-menu-item index="/personCenter">个人中心</el-menu-item>
              <el-menu-item index="/login" v-show="!isLogin">登录/注册</el-menu-item>
              <el-menu-item index="/login" v-show="isLogin">[退出]</el-menu-item>
            </el-menu>
            <div class="line"></div>
          </div>
          </div>
        </header>
      </div>
      <div class="main">
        <div class="main_login">
          <router-view></router-view>
        </div>
      </div>
      <div class="footerWrapper">
www
      </div>
    </div>
</template>

<script>
    import ElImageViewer from "element-ui/packages/image/src/image-viewer";
    export default {
        name: "index",
      components: {ElImageViewer},
      // 页面中用到的data
      data() {
          return {
            activeIndex: '/article',
            fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
            url: '../../static/tom.jpg',

            activeName: 'second',
          }
      },
      created() {

      },
      // 页面中用到的方法
      methods: {
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        }
      },
      computed:{
          isLogin(){
            if (sessionStorage.getItem("userName")&&sessionStorage.getItem("userToken")){
              this.$store.commit("userStatus",sessionStorage.getItem("userName"));
            } else {
              this.$store.commit("userName",null);
            }
            return this.$store.getters.isLogin;
          }
      }
    }
  </script>

<style scoped>
.body{
  height: 100%;
}
  .header{
    height: 100px;
    background-color: #fff;
    color: #2b4b6b;
    top: 0;
    left: 0;
    width: 100%;
    line-height: 80px;
    z-index: 100;
    position: relative;
  }
  .header .container {
    height: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid #dcdfe6;
  }
  .header h1 {
    height: 100px;
    margin: 0px 0px 0px 5%;
    float: left;
    font-size: 32px;
    font-weight: 400
  }
  .header .nav {
    margin: 0px 5% 0px 0px;
    float: right;
    height: 100%;
    line-height: 80px;
    background: transparent;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-weight: 400;
    font-size: small;
    padding: 0;
  }
  .main{
    background-color: darkgrey;
    height: 100%;
    margin-top: -80px;
    padding: 80px 0 340px;
    box-sizing: border-box;
    min-height: 100%;
  }
  .footerWrapper{
    background-color: #f7fbfd;
    width: 100%;
    padding: 40px 150px;
    margin-top: -340px;
    box-sizing: border-box;
    height: 340px;
  }
  .main_login{
    width: 40%;
    height: 60%;
    position: absolute;
    left: 78%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
.el-menu-demo{
  height: 100%;
}
.el-menu-item{
  height: 100%;
  line-height: 90px;
  font-size: 140%;
  margin-right: 20px;
  ;
}
</style>
