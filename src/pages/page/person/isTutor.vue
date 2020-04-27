<template>
    <div>
      <el-tabs type="border-card">
        <el-tab-pane label="我的学生信息">
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item :title="value.name" :name="index"
            v-for="(value,index) in myStudents"
            :key="value.name">
              <el-card class="box-card" shadow="always">
                <div slot="header" class="clearfix">
                  <span>{{value.name}}</span>
                </div>
                <div class="item"><div class="title">学生年龄：</div><div class="content" >{{value.age}}</div></div>
                <div class="item"><div class="title">学生性别：</div><div class="content" >{{value.sex}}</div></div>
                <div class="item"><div class="title">学生年级：</div><div class="content" >{{value.grade}}</div></div>
                <div class="item"><div class="title">文理科：</div><div class="content" >{{value.subject}}</div></div>
                <div class="item"><div class="title">学生手机号：</div><div class="content" >{{value.phoneNumber}}</div></div>
                <div class="item"><div class="title">辅导科目：</div><div class="content" >{{value.able}}</div></div>
                <div class="item"><div class="title">家教地点：</div><div class="content" >{{value.location}}</div></div>
                <div class="item"><div class="title">学生爱好：</div><div class="content" >{{value.hobby}}</div></div>
              </el-card>
            </el-collapse-item>
            <!--
            <el-collapse-item title="反馈 Feedback" name="2">
              <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
            </el-collapse-item>
            <el-collapse-item title="效率 Efficiency" name="3">
              <div>简化流程：设计简洁直观的操作流程；</div>
              <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
            </el-collapse-item>
            <el-collapse-item title="可控 Controllability" name="4">
              <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
            </el-collapse-item>-->
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="去请家教">
          <edit ref="addTutor"></edit>
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
            activeNames:['1'],
            myStudents:[],
          }
      },
      methods:{
          submit(){
            alert("提交了")
          },
        handleChange(val) {
          console.log(val);
        },
      },
      components:{
          edit
      },
      async mounted(){
          let res = await this.$axios.get('../../static/json/myStudent.json');
          this.myStudents=res.data;
      }
    }
</script>

<style scoped>
  .item{
    height: 20px;
    width: 100%;
    padding: 5px 10px;
    border-bottom: 1px solid #909399;

  }
  .title{
    font: 16px Medium;
    width: 30%;
    text-align: left;
  }
  .content{
    font: 14px Base;
    width: 65%;
  }
</style>
