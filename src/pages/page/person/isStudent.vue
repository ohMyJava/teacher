<template>
    <div>
      <el-tabs type="border-card">
        <el-tab-pane label="我的家教信息">
          <el-collapse v-model="activeNames" @change="handleChange" accordion>
            <el-collapse-item
              v-for="(value,index) in myTutors"
              :key="value.id"
              :title="value.name"
              :name="index">

              <el-card class="box-card" shadow="always">
                <div slot="header" class="clearfix">
                  <span style="font-weight: bold">学生姓名：{{value.studentName}}||家教姓名：{{value.name}}</span>
                </div>
                <el-row>
                  <el-col class="title" :xs="7" :sm="7" :md="7" :lg="7" :xl="7">家教年龄：</el-col>
                  <el-col class="content" :xs="17" :sm="17" :md="17" :lg="17" :xl="17">{{value.age}}</el-col>
                </el-row>
                <el-row>
                  <el-col class="title" :xs="7" :sm="7" :md="7" :lg="7" :xl="7">家教性别：</el-col>
                  <el-col class="content" :xs="17" :sm="17" :md="17" :lg="17" :xl="17">{{value.sex}}</el-col>
                </el-row>
                <el-row>
                  <el-col class="title" :xs="7" :sm="7" :md="7" :lg="7" :xl="7">家教学历：</el-col>
                  <el-col class="content" :xs="17" :sm="17" :md="17" :lg="17" :xl="17">{{value.education}}</el-col>
                </el-row>
                <el-row>
                  <el-col class="title" :xs="7" :sm="7" :md="7" :lg="7" :xl="7">家教所在学校：</el-col>
                  <el-col class="content" :xs="17" :sm="17" :md="17" :lg="17" :xl="17">{{value.school}}</el-col>
                </el-row>
                <el-row>
                  <el-col class="title" :xs="7" :sm="7" :md="7" :lg="7" :xl="7">家教手机号：</el-col>
                  <el-col class="content" :xs="17" :sm="17" :md="17" :lg="17" :xl="17">{{value.phoneNumber}}</el-col>
                </el-row>
                <el-row>
                  <el-col class="title" :xs="7" :sm="7" :md="7" :lg="7" :xl="7">辅导科目：</el-col>
                  <el-col class="content" :xs="17" :sm="17" :md="17" :lg="17" :xl="17">{{value.course}}</el-col>
                </el-row>
                <el-row>
                  <el-col class="title" :xs="7" :sm="7" :md="7" :lg="7" :xl="7">家教所在地：</el-col>
                  <el-col class="content" :xs="17" :sm="17" :md="17" :lg="17" :xl="17">{{value.location}}</el-col>
                </el-row>
                <el-row class="item">
                  <el-col class="title" :xs="7" :sm="7" :md="7" :lg="7" :xl="7">家教爱好：</el-col>
                  <el-col class="content" :xs="17" :sm="17" :md="17" :lg="17" :xl="17">{{value.hobby}}</el-col>
                </el-row>
              </el-card>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>

        <el-tab-pane label="想请家教">
          <edit ref="addStudent" :isShow="flag"></edit>
          <span style="text-align: center"><el-button round type="primary" @click="submit">提交</el-button></span>
        </el-tab-pane>

      </el-tabs>
    </div>
</template>

<script>
  import edit from '../../../components/EditStudentForm';
    export default {
        name: "isStudent",
      data(){
          return{
            flag:false,
            activeNames: 0,
            myTutors:[],
            userId: this.$store.getters.id,
          }
      },
      methods:{
        handleChange(val) {
          console.log(val);
        },
        submit(){
          this.$refs['addStudent'].check(1);
        }
      },
      components:{
        edit
      },
      async mounted(){
        //  从vuex全局中获取当前用户id
        let res = await this.$axios.get('/api/person/getMyTutors?userId='+this.userId);
        this.myTutors=res.data.data;
        /*let res = await this.$axios.get('../../static/json/myTutor.json');
        this.myTutors=res.data;*/
      }
    }
</script>

<style scoped>
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
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
