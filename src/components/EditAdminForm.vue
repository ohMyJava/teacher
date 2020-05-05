<template>
    <div>
      <h3>编辑管理员信息表单</h3>
      <el-form ref="form" :model="adminData" :rules="rules">
        <el-form-item label="管理员账号：" prop="adminName">
          <el-input v-model="adminName" placeholder="请输入管理员账号" ></el-input>
        </el-form-item>
        <el-form-item label="管理员密码" prop="adminPassword">
          <el-input v-model="adminPassword" placeholder="请输入管理员密码" show-password></el-input>
        </el-form-item>
        <el-form-item label="管理员权限" prop="power">
          <el-select v-model="power">
            <el-option
              v-for="value in powerList"
              :key="value.id"
              :value="value.title"
              :label="value.title"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="附加信息">
          <el-input type="textarea" v-model="adminInformation" placeholder="可不填"></el-input>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
    export default {
      name: "EditUserForm",
      data() {
        return {
          adminData: [],
          powerList: [
            {
              id: 0,
              title: "主管理员"
            },
            {
              id: 1,
              title: "省管理员"
            },
            {
              id: 2,
              title: "市管理员"
            },
            {
              id: 3,
              title: "区管理员"
            },
            {
              id: 4,
              title: "学校管理员"
            },
          ],
          rules: {
            adminName: [
              {required: true, message: '请输入管理员账号', trigger: 'change'}
            ],
            adminPassword: [
              {required: true, message: '请输入密码', trigger: 'change'},
              {max:10,min:6,message:'长度保持在6-12位',trigger:'blur'}
            ],
            power: [
              {required: true, message: '请选择权限', trigger: 'change'},
            ],
          }
        }
      },
      method(){

      }
    }
</script>

<style scoped>

</style>
