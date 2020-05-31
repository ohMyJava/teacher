<template>
  <div v-show="!this.$store.getters.isLogin">
    <el-row>
      <el-col :xs="0" :sm="10" :md="10" :lg="10" :xl="10">&nbsp;</el-col>
      <el-col :xs="24" :sm="14" :md="14" :lg="14" :xl="14" class="login-box">
        <el-form ref="form" :model="form" label-width="100px" :rules="rules">
          <el-form-item label="用户名：" prop="username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密      码：" prop="password">
            <el-input v-model="form.password" show-password></el-input>
          </el-form-item>
          <el-form-item label="用户类型：" prop="type">
            <el-radio-group v-model="form.type">
              <el-radio label="1">用户</el-radio>
              <el-radio label="2">管理员</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" round @click="login('form')">登录</el-button>
            <el-button type="primary" round @click="reg">注册</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      form: {
        username: "",
        password: "",
        type: "1"
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: ["blur", "change"]
          },
          {
            min: 5,
            max: 10,
            message: "长度在5到10个字符",
            trigger: ["blur", "change"]
          }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        type: [{ required: true, message: "请选择登陆类型", trigger: "change" }]
      }
    };
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate(async valid => {
        let username = this.form.username;
        let password = this.form.password;
        let type = this.form.type;
        if (valid) {
          const ret = await this.$axios.post("/api/user/login", {
            username: username,
            password: password,
            type: type
          });
          if (ret.data.flag === "true") {
            this.$message.success({
              message: "登录成功",
              showClose: true
            });

            let userName=ret.data.username;
            let type=ret.data.type;
            let token=ret.data.token;
            let id = ret.data.id;
            console.log(id)
            console.log(type)
            console.log(token)

            this.$store.dispatch("setUser",{userName,type,token,id});
            //将信息存入本地
            sessionStorage.setItem("username",userName);
            sessionStorage.setItem("token",token);
            sessionStorage.setItem("type",type);
            sessionStorage.setItem("id",id);

            //打印login状态
            console.log(this.$store.state.isLogin);
            console.log(this.$store.state)
            if (type === "1") {
              this.$router.push("/article");
            } else if (type === "2") {
              this.$router.push("/admin");
            }
          }else {
            this.$message.warning(ret.data.message)
          }
        } else {
          return false;
        }
      });
    },
    reg: function() {
      alert("正在打开注册页面！");
      let routerUrl = this.$router.resolve({
        path: "/reg"
      });
      window.open(routerUrl.href, "_blank");
    }
  },
  beforeRouteEnter:(to,from,next)=>{
    //组件内守卫
    //已登录状态回到登录页面，即登出
    next(vm=>{
      if (sessionStorage.getItem("username")){
        vm.$confirm("确定要退出吗？",'提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          //向后端发送请求，去清空token信息
          vm.$axios.get("/api/user/loginout").then(function (res) {
            if (res.data.code==="6666"){
              vm.$store.dispatch("clearUser");
              vm.$message({
                type: 'success',
                message: '退出成功！'
              });
            }else {
              vm.$message({
                type: 'warning',
                message: '退出失败！'
              });
            }
          })
        }).catch(()=>{

        })

      }
    });
  },
};
</script>

<style scoped>
  .login-box{
    padding:20px 40px 5px 5px;
    background-color: #E8E8FF;
    border-radius: 20px;
  }

</style>
