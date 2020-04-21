<template>
    <div style="margin-left: 15%;width: 60%;">
      <el-form ref="form" :model="form" label-width="120px" :rules="rules" >
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="form.userName" placeholder="请输入用户名" ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="form.sex">
            <el-radio label="1" >男</el-radio>
            <el-radio label="0" >女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-select v-model="form.age" placeholder="请选择年龄" >
            <el-option
              v-for="count in 30"
              :key="count"
              :label="count"
              :value="count">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" prop="phoneNumber">
          <el-input v-model="form.phoneNumber" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
  import Admin from "../../components/Admin"

    export default {
        name: "reg",
      data(){
          return{
            classNum: '',
            form:{
              userName:'',
              password:'',
              name:'',
              sex:'',
              age:'',
              phoneNumber:'',
            },
            rules: {
              userName:[
                {required:true,message:'请输入用户名',trigger:['blur','change']},
                {min:5,max:10,message:'长度在5到10个字符',trigger:['blur','change']}
              ],
              password:[
                {required:true,message:'请输入密码',trigger:'blur'}
              ],
              name:[
                {required:true,message:'请输入姓名',trigger:'blur'}
              ],
              sex:[
                {required:true,message:'请选择性别',trigger:'change'}
              ],
              age:[
                {required:true,message:'请选择年龄',trigger:'change'}
              ],
              phoneNumber:[
                {required:true,message:'请输入手机号',trigger:'blur'},
                {min:11,max:11,message:'请正确输入手机号',trigger:'blur'}
              ],
            }
          }
      },
      methods:{
        submitForm(formName) {
          this.$refs[formName].validate(async valid=>{
            let user=JSON.stringify(this.form);
            if (valid) {
              let res =await this.$axios.post('/api/user/register',user,{headers:{'Content-Type':'application/json'}});
              if (res.data.code==='6666'){
                this.$message.success(res.data.message);
              } else if (res.data.code === '7777') {
                this.$message.error(res.data.message);
              }
            }
          });
        },
      },
    }
</script>

<style scoped>

</style>
