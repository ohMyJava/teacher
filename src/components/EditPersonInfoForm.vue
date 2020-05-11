<template>
    <div>
      <el-form :model="form" ref="form" :rules="rules" :disabled="disable">
        <el-form-item label="用户账号">
          <el-input v-model="form.userName" disabled></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="form.sex"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phoneNumber">
          <el-input v-model="form.phoneNumber"></el-input>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
  import * as validate from '../assets/js/validate';
    export default {
        name: "EditPersonInfoForm",
      data(){
          return{
            disable:true,
            form:{},
            rules:{
              password:[{required:true,message:'请输入密码',trigger:'blur'},
                {min:6,max:12,message:'密码长度为6-12位',trigger:'change'}],
              name:[{required: true, message: '请输入姓名', trigger: 'blur'},
                {validator: validate.isTrueName, trigger: 'blur'}],
              sex:[{required: true, message: '请选择性别', trigger: 'change'}],
              age:[{required: true, message: '请选择年龄', trigger: 'change'}],
              phoneNumber:[
                {required: true, message: '请输入手机号', trigger: 'blur'},
                {validator: validate.isPhoneNumber, trigger: 'blur'}
                ],
            }
          }
      },
      methods:{
          setDisable(){
            this.disable=!this.disable;
          },
        updateInfo(){
          this.$refs['form'].validate(async (valid)=>{
            if (valid) {
              //    从vuex中取得userId
              this.form.userId=userId;
              let res = await this.$axios.post(
                "/api/person/updateMyInfo",
                this.form,
                {headers:{"content-type":"application/json"}});
              if (res.data.code === '6666') {
                this.$message.success("更新成功！");
                this.setDisable();
                this.$emit('getMessage',true);
              }else {
                this.$message.warning("更新失败！请重试或联系管理员！");
              }
            }else{
              this.$message.warning("请正确填写信息！");
            }
          })
        },
      },
      async mounted(){
        //  从vuex中获取当前用户id
        /*let res = await this.$axios.get('/api/person/getMyInfo?userId='+userId);
        this.form=res.data;*/
          let res = await this.$axios.get('../../static/json/userInfo.json');
          this.form=res.data;
      }
    }
</script>

<style scoped>

</style>
