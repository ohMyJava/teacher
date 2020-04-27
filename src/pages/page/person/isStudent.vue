<template>
    <div>
      <el-tabs type="border-card">
        <el-tab-pane label="我的学生信息">
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="一致性 Consistency" name="1">
              <el-card class="box-card" shadow="always">
                <div slot="header" class="clearfix">
                  <span>卡片名称</span>
                  <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                </div>
                <div v-for="o in 4" :key="o" class="text item">
                  {{'列表内容 ' + o }}
                </div>
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
          <edit ref="addStudent"></edit>
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
            activeNames: ['1'],
          }
      },
      methods:{
        handleChange(val) {
          console.log(val);
        },
        submit(){
          this.$refs['addStudent'].check();
        }
      },
      components:{
        edit
      }
    }
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>
