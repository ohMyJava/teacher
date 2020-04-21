<template>
    <div class="body">
      <el-container>
        <el-header>
          <div class="headerWrapper">
            <el-row>
              <div class="header">
                <el-col :xs="8" :sm="5" :md="5" :lg="5" :xl="5">
                  <a href="/"><img style="height: 80px;width: auto" src="../../static/logo.png" ></a>
                </el-col>
                <el-col :xs="0" :sm="4" :md="4" :lg="4" :xl="4">&nbsp;</el-col>
                <el-col :xs="15" :sm="14" :md="14" :lg="14" :xl="14">
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
                </el-col>
              </div>
            </el-row>
          </div>
        </el-header>
        <el-main>
          <div class="container">
            <div class="content">
              <router-view></router-view>
            </div>
        </div>
        </el-main>
        <el-footer>
          <div class="footer">
            <div class="footer-container">
              <h4>链接</h4>
              <a href="https://www.baidu.com" target="_blank" class="footer-link">有病百度</a>
              <a href="https://www.baidu.com" target="_blank" class="footer-link">艾滋起步</a>
              <a href="https://www.baidu.com" target="_blank" class="footer-link">轻则截肢</a>
              <a href="https://www.baidu.com" target="_blank" class="footer-link">重则入土</a>
              <a href="https://www.baidu.com" target="_blank" class="footer-link">点我搜病呀</a>
            </div>
            <div class="footer-container">
              <h4>联系方式</h4>
              <a href="https://www.baidu.com" target="_blank" class="footer-link">提点建议</a>
              <a href="https://www.baidu.com" target="_blank" class="footer-link">错误反馈</a>
              <a href="https://www.baidu.com" target="_blank" class="footer-link">联系作者</a>
            </div>
            <h5>Created by lgz.&nbsp;&nbsp;Date:2020-04</h5>
          </div>
        </el-footer>
      </el-container>
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
  .headerWrapper{
    z-index: 1000;
    background-color: white;
    position: fixed;
    top: 0;
    left: 0;
    height: 80px;
    width: 100%;
    line-height: 80px;
    display: block;
  }
  .header{
    height: 80px;
    margin: 0 20px;
    border-bottom: 1px solid #dcdfe6;
  }
  .el-menu-demo{
    float: right;
    border: none;
  }
  .el-menu-item{
    font-size: 15px;
    height: 80px;
    line-height: 80px;
    padding: 0 20px;
  }
  @media screen and (max-width:945px){
    .el-menu-item{
      font-size: 10px;
      padding: 0 10px;
    }
  }
  .container{
    margin-top: -80px;
    padding: 80px 0 280px;
    box-sizing: border-box;
    min-height: 100%;
  }
  .content{
    /*z-index: -1;*/
    padding: 55px 30px 65px;
    box-sizing: border-box;
  }
  .footer{
    background-color: #f7fbfd;
    width: 100%;
    padding: 40px 150px;
    margin-top: -300px;
    box-sizing: border-box;
    height: auto;
  }
  .footer-container{
    display: inline-block;
    vertical-align: top;
    margin-right: 110px;
  }
  .footer-link{
    display: block;
    margin: 0;
    line-height: 2;
    font-size: 14px;
    color: #666;
  }
</style>
