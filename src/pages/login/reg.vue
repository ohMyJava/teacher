<template>
    <div style="margin-left: 15%;width: 60%;">
      <el-form ref="form" :model="form" label-width="120px" :rules="rules" >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" ></el-input>
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
        <el-form-item label="身份" prop="type" >
          <el-radio-group v-model="form.type">
            <el-radio label="1" >用户</el-radio>
            <el-radio label="2" @change="form.componentName='admin'">管理员</el-radio>
          </el-radio-group>
        </el-form-item>
        <admin v-model="admData" v-show="form.componentName === 'admin'" ref="admForm"></admin>
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
            admData:{
              power: '',
              keywords: '',
            },
            form:{
              username:'',
              password:'',
              name:'',
              sex:'',
              age:'',
              type:'',
              componentName:'',
            },
            rules: {
              username:[
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
              type:[
                {required:true,message:'请选择身份',trigger:'change'}
              ],

            }
          }
      },
      methods:{
        submitForm(formName) {
          this.$refs[formName].validate((valid)=>{
            let flag=false;
            const info=new Map();
            info.set('userName',this.form.username);
            info.set('password',this.form.password);
            info.set('name',this.form.name);
            info.set('sex',this.form.sex);
            info.set('age',this.form.age);
            info.set('type',this.form.type);
            if (this.form.type === '1') {
              flag=true;
            }else if(this.form.type==='2'){
              flag=this.$refs['admForm'].validateForm();
              info.set('power',this.admData.power);
              info.set('keywords',this.admData.keywords);
            }
            console.dir(info);
            if (valid && flag) {
              alert("success");
            }else {
              alert('failed');
              return false;
            }
          });
        },
      },
      components: {
        Admin
      }
    }
</script>

<style scoped>

</style>
