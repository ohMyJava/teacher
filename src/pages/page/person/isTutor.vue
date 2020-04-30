<template>
    <div>
      <el-tabs type="border-card">
        <el-tab-pane label="我的学生信息">
          <el-collapse v-model="activeNames" @change="handleChange" accordion>
            <el-collapse-item
              v-for="(value,index) in myStudents"
              :key="value.id"
              :title="value.name"
              :name="index">

              <el-card class="box-card" shadow="always">
                <div slot="header" class="clearfix">
                  <span style="font-weight: bold">学生姓名：{{value.name}}||家教姓名{{value.tutorName}}</span>
                </div>
                <el-row>
                  <el-col class="title" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">学生年龄：</el-col>
                  <el-col class="content" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">{{value.age}}</el-col>
                </el-row>
                <el-row>
                  <el-col class="title" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">学生性别：</el-col>
                  <el-col class="content" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">{{value.sex}}</el-col>
                </el-row>
                <el-row>
                  <el-col class="title" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">学生年级：</el-col>
                  <el-col class="content" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">{{value.grade}}</el-col>
                </el-row>
                <el-row>
                  <el-col class="title" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">文理科：</el-col>
                  <el-col class="content" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">{{value.subject}}</el-col>
                </el-row>
                <el-row>
                  <el-col class="title" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">学生手机号：</el-col>
                  <el-col class="content" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">{{value.phoneNumber}}</el-col>
                </el-row>
                <el-row>
                  <el-col class="title" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">辅导科目：</el-col>
                  <el-col class="content" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">{{value.course}}</el-col>
                </el-row>
                <el-row>
                  <el-col class="title" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">家教地点：</el-col>
                  <el-col class="content" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">{{value.location}}</el-col>
                </el-row>
                <el-row class="item">
                  <el-col class="title" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">学生爱好：</el-col>
                  <el-col class="content" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">{{value.hobby}}</el-col>
                </el-row>
              </el-card>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>

        <el-tab-pane label="成为家教">
          <edit ref="addTutor" :isShow="flag"></edit>
          <span style="text-align: center"><el-button round type="primary" @click="submit">提交</el-button></span>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
  import edit from '../../../components/EditTutorForm';
    export default {
        name: "isTutor",
      data(){
          return{
            flag:false,
            activeNames: 0,
            myStudents:[],
          }
      },
      methods:{
          submit(){
            this.$refs['addTutor'].check(1);
          },
        handleChange(val) {
          console.log(val);
        },
      },
      components:{
          edit
      },
      async mounted(){
        //  从vuex中获取当前用户id
        let res = await this.$axios.get('/api/person/getMyStudents?userId='+userId);
        this.myStudents=res.data;
          /*let res = await this.$axios.get('../../static/json/myStudent.json');
          this.myStudents=res.data;*/
      }
    }
</script>

<style scoped>
  .el-row{
    padding: 5px 0;
    border: 1px solid dimgrey;
  }
  .title{
    font: 16px Medium;
  }
  .content{
    font: 14px Base;
    text-align: left;
  }
  .box-card {
    width: 100%;
  }
  .el-row{
    padding: 5px 0;
    border: 1px solid dimgrey;
  }
  .title{
    font: 16px Medium;
  }
  .content{
    font: 14px Base;
    text-align: left;
  }
</style>
