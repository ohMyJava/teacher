<template>
    <div>
      <el-card class="box-card" shadow="always">
        <div slot="header" class="clearfix">
          <span>个人资料</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="disable = false;setChildDisable()">编辑资料</el-button>
        </div>
        <edit ref="infoForm" @getMessage="getMessage()"></edit>
        <el-button type="primary" round @click="updateUserInfo" :disabled="disable">提交</el-button>
      </el-card>
    </div>
</template>

<script>
import edit from '../../../components/EditPersonInfoForm'
    export default {
        name: "personInfo",
      data(){
          return{
            disable:true,
          }
      },
      methods:{
          updateUserInfo(){
            this.$refs['infoForm'].updateInfo();
          },
        setChildDisable(){
          this.$refs['infoForm'].setDisable();
        },
        getMessage(msg){
            this.disable=msg;
        },
      },
      components:{
          edit
      },
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

  }
</style>
